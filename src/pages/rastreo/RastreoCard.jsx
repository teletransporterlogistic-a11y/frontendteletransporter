export default function RastreoCard({ envio }) {
  return (
    <div className="rastreo-card">
      <h3>Envío #{envio.envioId}</h3>

      <div className="rastreo-info">
        <p><strong>Cliente:</strong> {envio.cliente}</p>
        <p><strong>Operador:</strong> {envio.operador}</p>
        <p><strong>Última actualización:</strong> {envio.timestamp}</p>
      </div>

      <div className={`rastreo-status ${envio.estado.toLowerCase()}`}>
        {envio.estado.replace("_", " ")}
      </div>
    </div>
  );
}