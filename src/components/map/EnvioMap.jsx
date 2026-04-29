import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";

const iconVehiculo = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/743/743131.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function EnvioMap({ envio }) {
  if (!envio) return null;

  // -----------------------------
  // 1. Coordenadas de origen y destino
  // -----------------------------
  const origen = envio.origenCoords || [19.7008, -101.1844]; // fallback Morelia
  const destino = envio.destinoCoords || [19.4204, -102.0572]; // fallback Uruapan

  // -----------------------------
  // 2. Última ubicación del operador
  // -----------------------------
  const ultimoEvento = envio.eventos?.length
    ? envio.eventos[envio.eventos.length - 1]
    : null;

  const ultimaUbicacion = ultimoEvento?.coords || origen;

  // -----------------------------
  // 3. Ruta (origen → destino)
  // -----------------------------
  const ruta = [origen, destino];

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        borderRadius: "12px",
        overflow: "hidden",
        marginTop: "20px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      }}
    >
      <MapContainer
        center={ultimaUbicacion}
        zoom={10}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {/* Ruta */}
        <Polyline positions={ruta} color="#2563EB" weight={4} />

        {/* Origen */}
        <Marker position={origen}>
          <Popup>Origen</Popup>
        </Marker>

        {/* Destino */}
        <Marker position={destino}>
          <Popup>Destino</Popup>
        </Marker>

        {/* Última ubicación */}
        <Marker position={ultimaUbicacion} icon={iconVehiculo}>
          <Popup>
            Última ubicación<br />
            {ultimoEvento?.descripcion || "Sin eventos"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}