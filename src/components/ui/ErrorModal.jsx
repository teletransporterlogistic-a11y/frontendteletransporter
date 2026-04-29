export function ErrorModal({ open, onClose, message }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-icon-error">✕</div>
        <h2 className="modal-title">Error</h2>
        <p className="modal-message">{message}</p>

        <button className="btn-primary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
