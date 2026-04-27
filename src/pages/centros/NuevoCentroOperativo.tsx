import { useCreateCentroOperativo } from "../../hooks/centros/useCreateCentroOperativo";
import { useCentroOperativoForm } from "../../hooks/centros/useCentroOperativoForm";
import CentroOperativoForm from "../../components/centros/CentroOperativoForm";

export default function NuevoCentroOperativo() {
  const create = useCreateCentroOperativo();
  const { form, errors, validate, updateField } = useCentroOperativoForm();

  const onSubmit = () => {
    if (!validate()) return;
    create.mutate(form);
  };

  return (
    <CentroOperativoForm
      form={form as any}
      errors={errors}
      updateField={updateField as any}
      onSubmit={onSubmit}
      loading={create.isPending}
    />
  );
}
