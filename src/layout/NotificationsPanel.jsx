import "./NotificationsPanel.css";

export default function NotificationsPanel({ open, onClose, user }) {
  return (
    <div className={`notif-panel-backdrop ${open ? "open" : ""}`}>
      <aside className={`notif-panel ${open ? "open" : ""}`}>

        {/* HEADER */}
        <div className="notif-header">
          <h3>Notificaciones</h3>

          <button
            className="notif-close-btn"
            aria-label="Cerrar panel de notificaciones"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="notif-body">

          {/* EJEMPLO DE NOTIFICACIONES */}
          <div className="notif-item">
            <span className="notif-title">Envío #12345 entregado</span>
            <span className="notif-meta">Hace 2 min</span>
          </div>

          <div className="notif-item">
            <span className="notif-title">Fallo en notificación SMS</span>
            <span className="notif-meta">Hace 10 min</span>
          </div>

          <div className="notif-item">
            <span className="notif-title">Nuevo cliente registrado</span>
            <span className="notif-meta">Hace 1 hora</span>
          </div>

          <div className="notif-item">
            <span className="notif-title">Operador asignado a ruta 7</span>
            <span className="notif-meta">Hace 3 horas</span>
          </div>

        </div>

      </aside>
    </div>
  );
}