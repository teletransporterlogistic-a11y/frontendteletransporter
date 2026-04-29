import { useCreateVehiculo } from "../../hooks/vehiculos/useCreateVehiculo";
import { useVehiculoForm } from "../../hooks/vehiculos/useVehiculoForm";
import VehiculoForm from "../../components/vehiculos/VehiculoForm";
import { useOperadores } from "../../hooks/operadores/useOperadores";
import { useCentrosOperativos } from "../../hooks/centros/useCentrosOperativos";

export default function NuevoVehiculo() {
  const create = useCreateVehiculo();
  const { form, errors, validate, updateField } = useVehiculoForm();

  const { data: operadores } = useOperadores({ page: 1, pageSize: 999 });
  const { data: centros } = useCentrosOperativos({ page: 1, pageSize: 999 });

  const onSubmit = () => {
    if (!validate()) return;
    create.mutate(form);
  };

  return (
    <VehiculoForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={create.isPending}
      operadores={operadores?.data ?? []}
      centros={centros?.data ?? []}
    />
  );
}
