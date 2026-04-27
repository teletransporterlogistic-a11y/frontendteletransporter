// src/hooks/useModal.ts
import { useState } from "react";

export type ModalType = "success" | "error";

export interface ModalState {
  open: boolean;
  type: ModalType;
  title: string;
  message: string;
}

export function useModal() {
  const [modal, setModal] = useState<ModalState>({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  const showSuccess = (title: string, message: string) => {
    setModal({
      open: true,
      type: "success",
      title,
      message,
    });
  };

  const showError = (title: string, message: string) => {
    setModal({
      open: true,
      type: "error",
      title,
      message,
    });
  };

  const closeModal = () => {
    setModal((m) => ({ ...m, open: false }));
  };

  return { modal, showSuccess, showError, closeModal };
}
