import { useNavigate } from "react-router-dom";
import "./TrackingModal.css";

const iconos = {
  CREACION: "📝",
  PAGO: "💰",
  GENERACION: "🏷️",
  DOCUMENTADO: "📄",
  ESTADO: "🔄",
  ASIGNACION: "👷",
  INCIDENCIA: "⚠️",
};

export default function TrackingModal({ open, envio, onClose }) {
  const navigate = useNavigate();

  if (!open || !envio) return null;

  function irARastreo() {
    navigate(`/envios/${envio.id}/rastreo`);
    onClose();
  }

  return (
    <div className="tracking-overlay" onClick={onClose}>
      <div className="tracking-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="tracking-title">Tracking del Envío</h3>

        <p className="tracking-guia">
          <strong>Guía:</strong> {envio.guia || "Sin guía"}
        </p>

        <div className="timeline">
          {envio.eventos?.length > 0 ? (
            envio.eventos.map((ev, i) => (
              <div key={i} className="timeline-item">
                <div
                  className={`timeline-icon icon-${ev.tipo?.toLowerCase()}`}
                >
                  {iconos[ev.tipo] || "📦"}
                </div>

                <div className="timeline-content">
                  <strong>{ev.descripcion}</strong>
                  <p>{new Date(ev.fecha).toLocaleString()}</p>
                  {ev.ubicacion && <small>📍 {ev.ubicacion}</small>}
                </div>
              </div>
            ))
          ) : (
            <p className="no-events">Sin eventos registrados.</p>
          )}
        </div>

        <div className="tracking-actions">
          <button className="btn-rastreo" onClick={irARastreo}>
            Ver mapa en tiempo real
          </button>

          <button className="btn-cerrar" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}