import { useCreateCliente } from "../../hooks/clientes/useCreateCliente";
import { useClienteForm } from "../../hooks/clientes/useClienteForm";
import { ClienteForm } from "../../components/clientes/ClienteForm"; // 👈 CORREGIDO
import { SuccessModal } from "../../components/ui/SuccessModal";
import { ErrorModal } from "../../components/ui/ErrorModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NuevoCliente() {
  const navigate = useNavigate();
  const create = useCreateCliente();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    form,
    errors,
    municipiosCP,
    validate,
    updateField,
    addDomicilio,
    updateDomicilio,
  } = useClienteForm();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    create.mutate(form, {
      onSuccess: () => {
        setShowSuccess(true);
      },
      onError: (err) => {
        setErrorMsg(err?.message || "Ocurrió un error inesperado");
        setShowError(true);
      },
    });
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigate("/clientes");
  };

  const closeError = () => {
    setShowError(false);
  };

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
