import { useParams } from "react-router-dom";
import { useVehiculo } from "../../hooks/vehiculos/useVehiculo";
import { useUpdateVehiculo } from "../../hooks/vehiculos/useUpdateVehiculo";
import { useVehiculoForm } from "../../hooks/vehiculos/useVehiculoForm";
import VehiculoForm from "../../components/vehiculos/VehiculoForm";
import { useOperadores } from "../../hooks/operadores/useOperadores";
import { useCentrosOperativos } from "../../hooks/centros/useCentrosOperativos";

export default function EditarVehiculo() {
  const { id } = useParams();
  const vehiculoId = Number(id);

  const { data, isLoading } = useVehiculo(vehiculoId);
  const update = useUpdateVehiculo(vehiculoId);

  const { form, errors, validate, updateField } = useVehiculoForm(data);

  const { data: operadores } = useOperadores({ page: 1, pageSize: 999 });
  const { data: centros } = useCentrosOperativos({ page: 1, pageSize: 999 });

  const onSubmit = () => {
    if (!validate()) return;
    update.mutate(form);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <VehiculoForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={update.isPending}
      operadores={operadores?.data ?? []}
      centros={centros?.data ?? []}
    />
  );
}
