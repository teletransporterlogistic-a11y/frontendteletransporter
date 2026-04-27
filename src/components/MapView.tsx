import { useEffect, useRef } from "react";
import L, { Map as LeafletMap, Marker, Polyline } from "leaflet";
import { OperatorState, OperatorPosition } from "../types";
import "leaflet/dist/leaflet.css";

// Fix global de íconos Leaflet (Vite + Railway)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
});

type Props = {
  operators: OperatorState[];
  history: Record<number, OperatorPosition[]>;
  replay: { enabled: boolean; operadorId?: number };
};

const MapView: React.FC<Props> = ({ operators, history, replay }) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<number, Marker>>({});
  const polylinesRef = useRef<Record<number, Polyline>>({});
  const replayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Inicializar mapa UNA sola vez
  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map", {
        zoomControl: true,
        attributionControl: false,
      }).setView([19.7008, -101.186], 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
    }

    return () => {
      // Cleanup total al desmontar
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Actualizar markers y polylines
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Eliminar markers de operadores que ya no existen
    Object.keys(markersRef.current).forEach((id) => {
      const operadorId = Number(id);
      if (!operators.some((op) => op.operadorId === operadorId)) {
        markersRef.current[operadorId]?.remove();
        delete markersRef.current[operadorId];
      }
    });

    operators.forEach((op) => {
      const latlng: [number, number] = [op.lat, op.lng];
      const existing = markersRef.current[op.operadorId];

      // Crear marker si no existe
      if (!existing) {
        const marker = L.marker(latlng).addTo(map);
        marker.bindPopup(op.nombre);
        markersRef.current[op.operadorId] = marker;
      } else {
        animateMarker(existing, op.lat, op.lng);
      }

      // Dibujar polyline del historial
      const hist = history[op.operadorId] || [];
      if (hist.length > 1) {
        const coords = hist.map((p) => [p.lat, p.lng]) as [
          number,
          number
        ][];

        if (polylinesRef.current[op.operadorId]) {
          polylinesRef.current[op.operadorId].setLatLngs(coords);
        } else {
          polylinesRef.current[op.operadorId] = L.polyline(coords, {
            color: "#38bdf8",
            weight: 2,
          }).addTo(map);
        }
      }
    });
  }, [operators, history]);

  // Replay histórico
  useEffect(() => {
    if (!replay.enabled || !replay.operadorId || !mapRef.current) return;

    const frames = history[replay.operadorId] || [];
    if (!frames.length) return;

    // Cancelar replay previo
    if (replayIntervalRef.current) {
      clearInterval(replayIntervalRef.current);
    }

    let idx = 0;

    const marker =
      markersRef.current[replay.operadorId] ||
      L.marker([frames[0].lat, frames[0].lng]).addTo(mapRef.current);

    replayIntervalRef.current = setInterval(() => {
      const frame = frames[idx];
      if (!frame) {
        clearInterval(replayIntervalRef.current!);
        return;
      }
      marker.setLatLng([frame.lat, frame.lng]);
      idx++;
    }, 500);

    return () => {
      if (replayIntervalRef.current) {
        clearInterval(replayIntervalRef.current);
      }
    };
  }, [replay, history]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

// Animación suave del marker
function animateMarker(
  marker: Marker,
  newLat: number,
  newLng: number,
  duration = 800
) {
  const start = marker.getLatLng();
  const end = L.latLng(newLat, newLng);
  const startTime = performance.now();

  function animate(time: number) {
    const t = Math.min((time - startTime) / duration, 1);
    const lat = start.lat + (end.lat - start.lat) * t;
    const lng = start.lng + (end.lng - start.lng) * t;
    marker.setLatLng([lat, lng]);
    if (t < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

export default MapView;
