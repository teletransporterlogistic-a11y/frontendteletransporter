export function SuccessModal({ open, onClose, message }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-icon-success">✓</div>
        <h2 className="modal-title">¡Éxito!</h2>
        <p className="modal-message">{message}</p>

        <button className="btn-primary" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
