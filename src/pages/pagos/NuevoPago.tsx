import { useCreatePago } from "../../hooks/pagos/useCreatePago";
import { usePagoForm } from "../../hooks/pagos/usePagoForm";
import PagoForm from "../../components/pagos/PagoForm";
import { useEnvios } from "../../hooks/envios/useEnvios";
import { useClientes } from "../../hooks/clientes/useClientes";

export default function NuevoPago() {
  const create = useCreatePago();
  const { form, errors, validate, updateField } = usePagoForm();

  const { data: envios } = useEnvios({ page: 1, pageSize: 999, search: "" });
  const { data: clientes } = useClientes({ page: 1, pageSize: 999, search: "", activo: true });

  const onSubmit = () => {
    if (!validate()) return;
    create.mutate(form);
  };

  return (
    <PagoForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={create.isPending}
      envios={envios?.data ?? []}
      clientes={clientes?.data ?? []}
    />
  );
}
