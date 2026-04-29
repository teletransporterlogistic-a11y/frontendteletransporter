import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehiculoSchema, VehiculoFormData } from "../../validation/vehiculo.schema";

type Props = {
  initial?: Partial<VehiculoFormData>;
  onSubmit: (data: VehiculoFormData) => void;
  loading?: boolean;
};

function VehiculoForm({ initial, onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehiculoFormData>({
    resolver: zodResolver(vehiculoSchema),
    defaultValues: {
      placas: "",
      marca: "",
      modelo: "",
      capacidad: 0,
      operadorId: undefined,
      ...initial,
    },
  });

  const submit = (data: VehiculoFormData) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(submit)} className="form">
      <div>
        <label>Placas</label>
        <input {...register("placas")} />
        {errors.placas && <span>{errors.placas.message}</span>}
      </div>

      <div>
        <label>Marca</label>
        <input {...register("marca")} />
        {errors.marca && <span>{errors.marca.message}</span>}
      </div>

      <div>
        <label>Modelo</label>
        <input {...register("modelo")} />
        {errors.modelo && <span>{errors.modelo.message}</span>}
      </div>

      <div>
        <label>Capacidad</label>
        <input type="number" {...register("capacidad", { valueAsNumber: true })} />
        {errors.capacidad && <span>{errors.capacidad.message}</span>}
      </div>

      <div>
        <label>Operador (opcional)</label>
        <input
          type="number"
          {...register("operadorId", {
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
        />
        {errors.operadorId && <span>{errors.operadorId.message}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar vehículo"}
      </button>
    </form>
  );
}

export default VehiculoForm;
