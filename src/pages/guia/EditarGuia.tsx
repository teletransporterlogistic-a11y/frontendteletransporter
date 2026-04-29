import { useParams } from "react-router-dom";
import { useGuia } from "../../hooks/guias/useGuia";
import { useUpdateGuia } from "../../hooks/guias/useUpdateGuia";
import { useGuiaForm } from "../../hooks/guias/useGuiaForm";
import GuiaForm from "../../components/guias/GuiaForm";
import { useMunicipios } from "../../hooks/municipios/useMunicipios";
import { useEffect } from "react";

export default function EditarGuia() {
  const { id } = useParams();
  const guiaId = Number(id);

  const { data, isLoading } = useGuia(guiaId);
  const update = useUpdateGuia(guiaId);
  const { data: municipios } = useMunicipios();

  const { form, errors, validate, updateField, setForm } = useGuiaForm();

  // Cargar datos cuando lleguen
  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const onSubmit = () => {
    if (!validate()) return;
    update.mutate(form);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <GuiaForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={update.isPending}
      municipios={municipios ?? []}
    />
  );
}
