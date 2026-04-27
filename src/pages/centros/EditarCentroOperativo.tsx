import { useParams } from "react-router-dom";
import { useCentroOperativo } from "../../hooks/centros/useCentroOperativo";
import { useUpdateCentroOperativo } from "../../hooks/centros/useUpdateCentroOperativo";
import { useCentroOperativoForm } from "../../hooks/centros/useCentroOperativoForm";
import CentroOperativoForm from "../../components/centros/CentroOperativoForm";

export default function EditarCentroOperativo() {
  const { id } = useParams();
  const centroId = Number(id);

  const { data, isLoading } = useCentroOperativo(centroId);
  const update = useUpdateCentroOperativo(centroId);

  const { form, errors, validate, updateField } = useCentroOperativoForm(data || undefined);

  const onSubmit = () => {
    if (!validate()) return;
    update.mutate(form as any);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <CentroOperativoForm
      form={form as any}
      errors={errors}
      updateField={updateField as any}
      onSubmit={onSubmit}
      loading={update.isPending}
    />
  );
}
