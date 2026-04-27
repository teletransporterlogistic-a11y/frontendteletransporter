import { useCreateGuia } from "../../hooks/guias/useCreateGuia";
import { useGuiaForm } from "../../hooks/guias/useGuiaForm";
import GuiaForm from "../../components/guias/GuiaForm";
import { useMunicipios } from "../../hooks/municipios/useMunicipios";

export default function NuevaGuia() {
  const create = useCreateGuia();
  const { form, errors, validate, updateField } = useGuiaForm();
  const { data: municipios } = useMunicipios();

  const onSubmit = () => {
    if (!validate()) return;
    create.mutate(form);
  };

  return (
    <GuiaForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={create.isPending}
      municipios={municipios ?? []}
    />
  );
}
