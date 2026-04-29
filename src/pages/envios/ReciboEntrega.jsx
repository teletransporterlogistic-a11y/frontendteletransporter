import { useLocation, useNavigate } from "react-router-dom";
import "./ReciboPreview.css";

export default function ReciboPreview() {
  const location = useLocation();
  const navigate = useNavigate();

  const envio = location.state?.envio;
  const cliente = location.state?.cliente;

  if (!envio || !cliente) {
    return (
      <div className="error-msg">
        No hay datos del recibo.
        <button className="btn-primary" onClick={() => navigate("/entregas")}>
          Volver
        </button>
      </div>
    );
  }

  const fechaEntrega = envio.fechaEntrega
    ? new Date(envio.fechaEntrega).toLocaleDateString()
    : "N/A";

  const horaEntrega = envio.fechaEntrega
    ? new Date(envio.fechaEntrega).toLocaleTimeString()
    : "N/A";

  return (
    <div className="recibo-container">

      <h2 className="recibo-title">COMPROBANTE DE ENTREGA</h2>

      <div className="recibo-card">

        <p className="leyenda">
          Se hace constar que el envío con número de guía
          <strong> {envio.guia} </strong>
          fue entregado correctamente al destinatario o persona autorizada.
        </p>

        <div className="recibo-section">
          <h3>DATOS DEL ENVÍO</h3>
          <p><strong>Guía:</strong> {envio.guia}</p>
          <p><strong>Remitente:</strong> {envio.remitenteNombre}</p>
          <p><strong>Destinatario:</strong> {envio.destinatarioNombre}</p>
          <p><strong>Destino:</strong> {envio.destinatarioCiudad}, {envio.destinatarioEstado}</p>
          <p><strong>Peso:</strong> {envio.peso} kg</p>
        </div>

        <div className="recibo-section">
          <h3>ENTREGA</h3>
          <p><strong>Recibió:</strong> {cliente.nombre}</p>
          <p><strong>Fecha:</strong> {fechaEntrega}</p>
          <p><strong>Hora:</strong> {horaEntrega}</p>
          <p><strong>Atendió:</strong> {envio.usuarioEntrega ?? "MOSTRADOR"}</p>
        </div>

        <div className="firma">
          ______________________________<br />
          Firma del cliente
        </div>

      </div>

      <button
        className="btn-finalizar"
        onClick={() => navigate("/entregas")}
      >
        Finalizar
      </button>

    </div>
  );
}
