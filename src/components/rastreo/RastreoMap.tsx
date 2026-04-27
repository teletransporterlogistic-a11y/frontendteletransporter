import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix universal de íconos Leaflet (Vite + Railway)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
});

export default function RastreoMap({ envios }) {
  // Obtener último punto de cada envío
  const puntos = envios
    .map((e) => {
      const r = e.rastreo?.[e.rastreo.length - 1];
      return r?.lat && r?.lng ? [r.lat, r.lng] : null;
    })
    .filter(Boolean);

  // Centro del mapa
  const center = puntos[0] || [19.4326, -99.1332]; // fallback CDMX

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {envios.map((e) => {
        const historial = e.rastreo || [];
        if (historial.length === 0) return null;

        const ultimo = historial[historial.length - 1];
        if (!ultimo.lat || !ultimo.lng) return null;

        return (
          <div key={e.id}>
            {/* Marker del envío */}
            <Marker position={[ultimo.lat, ultimo.lng]}>
              <Popup>
                <strong>Envío #{e.id}</strong>
                <br />
                Unidad: {e.unidad?.nombre ?? "—"}
                <br />
                Ruta: {e.ruta?.nombre ?? "—"}
                <br />
                Centro: {e.centroOperativo?.nombre ?? "—"}
                <br />
                Estado: {ultimo.estado}
                <br />
                {ultimo.detalle}
              </Popup>
            </Marker>

            {/* Polyline del historial */}
            {historial.length > 1 && (
              <Polyline
                positions={historial.map((p) => [p.lat, p.lng])}
                color="blue"
                weight={3}
              />
            )}
          </div>
        );
      })}
    </MapContainer>
  );
}
