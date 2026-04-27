// src/components/rastreo/RastreoCard.tsx
import "./RastreoCard.css";

interface RastreoEnvio {
  envioId: number;
  cliente: string;
  operador: string;
  timestamp: string;
  estado: string; // EJ: "EN_RUTA", "ENTREGADO", "PENDIENTE"
}

interface Props {
  envio: RastreoEnvio;
}

export default function RastreoCard({ envio }: Props) {
  const estadoNormalizado = envio.estado.toLowerCase().replace("_", "-");

  return (
    <div className="rastreo-card">
      <h3>Envío #{envio.envioId}</h3>

      <div className="rastreo-info">
        <p>
          <strong>Cliente:</strong> {envio.cliente}
        </p>
        <p>
          <strong>Operador:</strong> {envio.operador}
        </p>
        <p>
          <strong>Última actualización:</strong>{" "}
          {new Date(envio.timestamp).toLocaleString()}
        </p>
      </div>

      <div className={`rastreo-status ${estadoNormalizado}`}>
        {envio.estado.replace("_", " ")}
      </div>
    </div>
  );
}
