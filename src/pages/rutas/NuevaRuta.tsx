import { useCreateRuta } from "../../hooks/rutas/useCreateRuta";
import { useRutaForm } from "../../hooks/rutas/useRutaForm";
import RutaForm from "../../components/rutas/RutaForm";
import { useOperadores } from "../../hooks/operadores/useOperadores";
import { useUnidades } from "../../hooks/unidades/useUnidades";

export default function NuevaRuta() {
  const create = useCreateRuta();
  const { form, errors, validate, updateField } = useRutaForm();

  const { data: operadores } = useOperadores({ page: 1, pageSize: 999 });
  const { data: unidades } = useUnidades({ page: 1, pageSize: 999 });

  const onSubmit = () => {
    if (!validate()) return;
    create.mutate(form);
  };

  return (
    <RutaForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={create.isPending}
      operadores={operadores?.data ?? []}
      unidades={unidades?.data ?? []}
    />
  );
}
