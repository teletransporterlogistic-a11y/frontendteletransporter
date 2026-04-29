import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix global de Leaflet para íconos (Railway + Vite + React)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
});

export default function Mapa({ lat, lng }) {
  // Validación de coordenadas
  const isValid =
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng);

  if (!isValid) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "12px",
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        Ubicación no disponible
      </div>
    );
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[lat, lng]}>
        <Popup>Última ubicación reportada</Popup>
      </Marker>
    </MapContainer>
  );
}
