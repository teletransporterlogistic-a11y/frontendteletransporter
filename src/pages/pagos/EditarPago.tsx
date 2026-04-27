import { useParams } from "react-router-dom";
import { usePago } from "../../hooks/pagos/usePago";
import { useUpdatePago } from "../../hooks/pagos/useUpdatePago";
import { usePagoForm } from "../../hooks/pagos/usePagoForm";
import PagoForm from "../../components/pagos/PagoForm";
import { useEnvios } from "../../hooks/envios/useEnvios";
import { useClientes } from "../../hooks/clientes/useClientes";

export default function EditarPago() {
  const { id } = useParams();
  const pagoId = Number(id);

  const { data, isLoading } = usePago(pagoId);
  const update = useUpdatePago(pagoId);

  const { form, errors, validate, updateField } = usePagoForm(data);

  const { data: envios } = useEnvios({ page: 1, pageSize: 999, search: "" });
  const { data: clientes } = useClientes({ page: 1, pageSize: 999, search: "", activo: true });

  const onSubmit = () => {
    if (!validate()) return;
    update.mutate(form);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <PagoForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={update.isPending}
      envios={envios?.data ?? []}
      clientes={clientes?.data ?? []}
    />
  );
}
