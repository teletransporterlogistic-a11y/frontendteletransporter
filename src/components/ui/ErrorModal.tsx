// src/components/ui/ErrorModal.tsx
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export function ErrorModal({ open, onClose, message = "Ocurrió un error" }: Props) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="alertdialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="modal-box modal-error"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-icon-error">✕</div>

        <h2 className="modal-title">Error</h2>

        {message && <p className="modal-message">{message}</p>}

        <button className="btn-primary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
