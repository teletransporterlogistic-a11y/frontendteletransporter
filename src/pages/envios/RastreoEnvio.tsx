import { useParams } from "react-router-dom";
import { useHistorialRastreo } from "../../hooks/rastreo/useHistorialRastreo";
import { useRastreoRealtime } from "../../hooks/rastreo/useRastreoRealtime";
import RastreoTimeline from "../../components/rastreo/RastreoTimeline";
import RastreoMap from "../../components/rastreo/RastreoMap";

export default function RastreoEnvio() {
  const { envioId } = useParams();
  const id = Number(envioId);

  const { data, isLoading } = useHistorialRastreo(id);
  const { eventos } = useRastreoRealtime(id, data ?? []);

  if (isLoading) return <div>Cargando rastreo...</div>;

  return (
    <div className="rastreo-layout">
      <div className="rastreo-left">
        <h1>Rastreo del Envío #{id}</h1>
        <RastreoTimeline eventos={eventos} />
      </div>
      <div className="rastreo-right">
        <RastreoMap eventos={eventos} />
      </div>
    </div>
  );
}
