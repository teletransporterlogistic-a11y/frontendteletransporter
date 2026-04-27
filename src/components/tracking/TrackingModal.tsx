// src/components/rastreo/TrackingModal.tsx
import { useNavigate } from "react-router-dom";
import "./TrackingModal.css";

// ===============================
// Tipos
// ===============================
export interface EventoTracking {
  tipo: string;
  descripcion?: string;
  fecha: string;
  ubicacion?: string;
}

export interface EnvioTracking {
  id: number;
  guia?: string;
  eventos?: EventoTracking[];
}

interface Props {
  open: boolean;
  envio: EnvioTracking | null;
  onClose: () => void;
}

// ===============================
// Íconos por tipo
// ===============================
const iconos: Record<string, string> = {
  CREACION: "📝",
  PAGO: "💰",
  GENERACION: "🏷️",
  DOCUMENTADO: "📄",
  ESTADO: "🔄",
  ASIGNACION: "👷",
  INCIDENCIA: "⚠️",
};

// ===============================
// Componente
// ===============================
export default function TrackingModal({ open, envio, onClose }: Props) {
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
          {envio.eventos?.length ? (
            envio.eventos.map((ev, i) => {
              const tipo = ev.tipo?.toUpperCase() || "CREACION";
              const icon = iconos[tipo] || "📦";

              return (
                <div key={i} className="timeline-item">
                  <div className={`timeline-icon icon-${tipo.toLowerCase()}`}>
                    {icon}
                  </div>

                  <div className="timeline-content">
                    <strong>{ev.descripcion || "Sin descripción"}</strong>
                    <p>{new Date(ev.fecha).toLocaleString()}</p>
                    {ev.ubicacion && <small>📍 {ev.ubicacion}</small>}
                  </div>
                </div>
              );
            })
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
