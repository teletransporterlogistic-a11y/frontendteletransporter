import { useParams } from "react-router-dom";
import { useRuta } from "../../hooks/rutas/useRuta";
import { useUpdateRuta } from "../../hooks/rutas/useUpdateRuta";
import { useRutaForm } from "../../hooks/rutas/useRutaForm";
import RutaForm from "../../components/rutas/RutaForm";
import { useOperadores } from "../../hooks/operadores/useOperadores";
import { useUnidades } from "../../hooks/unidades/useUnidades";

export default function EditarRuta() {
  const { id } = useParams();
  const rutaId = Number(id);

  const { data, isLoading } = useRuta(rutaId);
  const update = useUpdateRuta(rutaId);

  const { form, errors, validate, updateField } = useRutaForm(data);

  const { data: operadores } = useOperadores({ page: 1, pageSize: 999 });
  const { data: unidades } = useUnidades({ page: 1, pageSize: 999 });

  const onSubmit = () => {
    if (!validate()) return;
    update.mutate(form);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <RutaForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={update.isPending}
      operadores={operadores?.data ?? []}
      unidades={unidades?.data ?? []}
    />
  );
}
