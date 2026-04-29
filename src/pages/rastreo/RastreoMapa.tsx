import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "./RastreoMap.css";

export default function RastreoMap({ envios }) {
  const iconOperador = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
  });

  // Si no hay envíos activos, mostrar mensaje
  if (!envios || envios.length === 0) {
    return (
      <div className="rastreo-map-empty">
        No hay envíos activos para mostrar en el mapa.
      </div>
    );
  }

  // Tomar la primera posición válida para centrar el mapa
  const primerEnvioConPos = envios.find(
    (e) => e.rastreo && e.rastreo.length > 0
  );

  const center = primerEnvioConPos
    ? [
        primerEnvioConPos.rastreo[0].latitud,
        primerEnvioConPos.rastreo[0].longitud,
      ]
    : [19.4326, -99.1332]; // CDMX fallback

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={true}
      className="rastreo-map-container"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {envios.map((envio) => {
        const historial = envio.rastreo ?? [];
        if (historial.length === 0) return null;

        const ultima = historial[historial.length - 1];

        return (
          <div key={envio.id}>
            {/* Marker del operador */}
            <Marker
              position={[ultima.latitud, ultima.longitud]}
              icon={iconOperador}
            >
              <Popup>
                <strong>Guía:</strong> {envio.guia} <br />
                <strong>Operador:</strong>{" "}
                {envio.operador?.nombre || "Sin asignar"} <br />
                <strong>Última actualización:</strong>{" "}
                {new Date(ultima.fecha).toLocaleString()}
              </Popup>
            </Marker>

            {/* Línea de ruta */}
            <Polyline
              positions={historial.map((p) => [p.latitud, p.longitud])}
              color="blue"
            />
          </div>
        );
      })}
    </MapContainer>
  );
}
