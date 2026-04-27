// src/components/ui/SuccessModal.tsx
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export function SuccessModal({
  open,
  onClose,
  message = "Operación realizada correctamente",
}: Props) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="alertdialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="modal-box modal-success"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-icon-success">✓</div>

        <h2 className="modal-title">¡Éxito!</h2>

        {message && <p className="modal-message">{message}</p>}

        <button className="btn-primary" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
