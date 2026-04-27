import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { HeatmapPunto } from "../../types/almacenDashboard";
import "leaflet/dist/leaflet.css";

export default function AlmacenHeatmap({
  puntos,
}: {
  puntos: HeatmapPunto[] | undefined;
}) {
  if (!puntos || !puntos.length) return <div>Sin datos de actividad.</div>;

  const center = [puntos[0].lat, puntos[0].lng] as [number, number];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {puntos.map((p, idx) => (
        <CircleMarker
          key={idx}
          center={[p.lat, p.lng]}
          radius={5 + p.intensidad}
          pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.4 }}
        />
      ))}
    </MapContainer>
  );
}
