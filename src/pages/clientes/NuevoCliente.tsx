// src/pages/clientes/NuevoCliente.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateCliente } from "@/hooks/clientes/useCreateCliente";
import { useClienteForm } from "@/hooks/clientes/useClienteForm";

import { ClienteForm } from "@/components/clientes/ClienteForm";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { ErrorModal } from "@/components/ui/ErrorModal";

// ===============================
// Componente
// ===============================
export default function NuevoCliente() {
  const navigate = useNavigate();
  const create = useCreateCliente();

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const {
    form,
    errors,
    municipiosCP,
    validate,
    updateField,
    addDomicilio,
    updateDomicilio
  } = useClienteForm();

  // ===============================
  // Submit
  // ===============================
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    create.mutate(form, {
      onSuccess: () => {
        setShowSuccess(true);
      },
      onError: (err: any) => {
        setErrorMsg(err?.message || "Ocurrió un error inesperado");
        setShowError(true);
      }
    });
  };

  // ===============================
  // Modales
  // ===============================
  const closeSuccess = () => {
    setShowSuccess(false);
    navigate("/clientes");
  };

  const closeError = () => {
    setShowError(false);
  };

  // ===============================
  // Render
  // ===============================
  return (
    <>
      <ClienteForm
        form={form}
        errors={errors}
        municipiosCP={municipiosCP}
        updateField={updateField}
        addDomicilio={addDomicilio}
        updateDomicilio={updateDomicilio}
        onSubmit={onSubmit}
        loading={create.isPending}
      />

      <SuccessModal
        open={showSuccess}
        onClose={closeSuccess}
        message="El cliente se guardó correctamente."
      />

      <ErrorModal
        open={showError}
        onClose={closeError}
        message={errorMsg}
      />
    </>
  );
}
