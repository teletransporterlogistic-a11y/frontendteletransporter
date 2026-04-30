// src/components/ui/Modal.tsx
import React from "react";

export type ModalType = "success" | "error";

interface Props {
  open: boolean;
  type?: ModalType;
  title?: string;
  message?: string;
  onClose: () => void;
}

export default function Modal({
  open,
  type = "success",
  title = "",
  message = "",
  onClose,
}: Props) {
  if (!open) return null;

  const isError = type === "error";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-box ${isError ? "modal-error" : "modal-success"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="modal-title">{title}</h3>

        {message && <p className="modal-message">{message}</p>}

        <button className="btn-primary modal-btn" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
