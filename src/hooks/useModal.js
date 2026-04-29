import { useState } from "react";

export function useModal() {
  const [modal, setModal] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  const showSuccess = (title, message) => {
    setModal({ open: true, type: "success", title, message });
  };

  const showError = (title, message) => {
    setModal({ open: true, type: "error", title, message });
  };

  const closeModal = () => {
    setModal((m) => ({ ...m, open: false }));
  };

  return { modal, showSuccess, showError, closeModal };
}
