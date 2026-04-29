import { useParams } from "react-router-dom";
import { useOperador } from "../../hooks/operadores/useOperador";
import { useUpdateOperador } from "../../hooks/operadores/useUpdateOperador";
import { useOperadorForm } from "../../hooks/operadores/useOperadorForm";
import OperadorForm from "../../components/operadores/OperadorForm";

export default function EditarOperador() {
  const { id } = useParams();
  const operadorId = Number(id);

  const { data, isLoading } = useOperador(operadorId);
  const update = useUpdateOperador(operadorId);

  const { form, errors, validate, updateField } = useOperadorForm(data);

  const onSubmit = () => {
    if (!validate()) return;
    update.mutate(form);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <OperadorForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={update.isPending}
    />
  );
}
