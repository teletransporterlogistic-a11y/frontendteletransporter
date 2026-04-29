import React from "react";

export default function Modal({ open, type = "success", title, message, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-box ${type === "error" ? "modal-error" : "modal-success"}`}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>

        <button className="btn-primary modal-btn" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
