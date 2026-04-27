import { useParams } from "react-router-dom";
import { useEnvio } from "../../hooks/envios/useEnvio";
import { useUpdateEnvio } from "../../hooks/envios/useUpdateEnvio";
import { useEnvioForm } from "../../hooks/envios/useEnvioForm";
import EnvioForm from "../../components/envios/EnvioForm";
import { useClientes } from "../../hooks/clientes/useClientes";
import { useOperadores } from "../../hooks/operadores/useOperadores";
import { useEstadosEnvio } from "../../hooks/envios/useEstadosEnvio";

export default function EditarEnvio() {
  const { id } = useParams();
  const envioId = Number(id);

  const { data, isLoading } = useEnvio(envioId);
  const update = useUpdateEnvio(envioId);

  const { form, errors, validate, updateField } = useEnvioForm(data);

  const { data: clientes } = useClientes({ page: 1, pageSize: 999, search: "", activo: true });
  const { data: operadores } = useOperadores();
  const { data: estados } = useEstadosEnvio();

  const onSubmit = () => {
    if (!validate()) return;
    update.mutate(form);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <EnvioForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={update.isPending}
      clientes={clientes?.data ?? []}
      operadores={operadores ?? []}
      estados={estados ?? []}
    />
  );
}
