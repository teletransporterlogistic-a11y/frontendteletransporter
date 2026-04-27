// src/pages/recibos/ReciboEntregaPreview.tsx
import { useLocation, useNavigate } from "react-router-dom";
import "./ReciboPreview.css";

// ===============================
// Tipos
// ===============================
interface Cliente {
  nombre: string;
}

interface EnvioEntrega {
  id: number;
  guia: string;

  remitenteNombre: string;

  destinatarioNombre: string;
  destinatarioCiudad: string;
  destinatarioEstado: string;
  destinatarioMunicipio?: string;

  peso: number;

  fechaEntrega?: string;
  usuarioEntrega?: string;
}

interface LocationState {
  envio?: EnvioEntrega;
  cliente?: Cliente;
}

// ===============================
// Componente
// ===============================
export default function ReciboEntregaPreview() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | undefined;
  const envio = state?.envio;
  const cliente = state?.cliente;

  // ===============================
  // Validación
  // ===============================
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

  // ===============================
  // Fecha y hora
  // ===============================
  const fechaEntrega = envio.fechaEntrega
    ? new Date(envio.fechaEntrega).toLocaleDateString()
    : "N/A";

  const horaEntrega = envio.fechaEntrega
    ? new Date(envio.fechaEntrega).toLocaleTimeString()
    : "N/A";

  // ===============================
  // Render
  // ===============================
  return (
    <div className="recibo-container">
      <h2 className="recibo-title">COMPROBANTE DE ENTREGA</h2>

      <div className="recibo-card">
        <p className="leyenda">
          Se hace constar que el envío con número de guía
          <strong> {envio.guia} </strong>
          fue entregado correctamente al destinatario o persona autorizada.
        </p>

        {/* DATOS DEL ENVÍO */}
        <div className="recibo-section">
          <h3>DATOS DEL ENVÍO</h3>
          <p><strong>Guía:</strong> {envio.guia}</p>
          <p><strong>Remitente:</strong> {envio.remitenteNombre}</p>
          <p><strong>Destinatario:</strong> {envio.destinatarioNombre}</p>

          <p>
            <strong>Destino:</strong>{" "}
            {envio.destinatarioMunicipio ?? "N/A"},{" "}
            {envio.destinatarioCiudad}, {envio.destinatarioEstado}
          </p>

          <p><strong>Peso:</strong> {envio.peso} kg</p>
        </div>

        {/* ENTREGA */}
        <div className="recibo-section">
          <h3>ENTREGA</h3>
          <p><strong>Recibió:</strong> {cliente.nombre}</p>
          <p><strong>Fecha:</strong> {fechaEntrega}</p>
          <p><strong>Hora:</strong> {horaEntrega}</p>
          <p><strong>Atendió:</strong> {envio.usuarioEntrega ?? "MOSTRADOR"}</p>
        </div>

        {/* FIRMA */}
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
