import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rutaSchema, RutaFormData } from "../../validation/ruta.schema";

type Props = {
  initial?: Partial<RutaFormData>;
  onSubmit: (data: RutaFormData) => void;
  loading?: boolean;
};

function RutaForm({ initial, onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RutaFormData>({
    resolver: zodResolver(rutaSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      activo: true,
      ...initial,
    },
  });

  const submit = (data: RutaFormData) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(submit)} className="form">

      <div>
        <label>Nombre de la ruta</label>
        <input {...register("nombre")} />
        {errors.nombre && <span>{errors.nombre.message}</span>}
      </div>

      <div>
        <label>Descripción</label>
        <textarea {...register("descripcion")} />
        {errors.descripcion && <span>{errors.descripcion.message}</span>}
      </div>

      <div>
        <label>Activa</label>
        <input type="checkbox" {...register("activo")} />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar ruta"}
      </button>
    </form>
  );
}

export default RutaForm;
