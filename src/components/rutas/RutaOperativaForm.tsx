import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  rutaOperativaSchema,
  RutaOperativaFormData,
} from "../../validation/rutas-operativas.schema";

type Props = {
  initial?: Partial<RutaOperativaFormData>;
  onSubmit: (data: RutaOperativaFormData) => void;
  loading?: boolean;
};

export function RutaOperativaForm({ initial, onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RutaOperativaFormData>({
    resolver: zodResolver(rutaOperativaSchema),
    defaultValues: {
      nombre: "",
      operadorId: 0,
      puntos: [],
      ...initial,
    },
  });

  const puntos = watch("puntos");

  const addPunto = () => {
    const lat = Number(prompt("Latitud"));
    const lng = Number(prompt("Longitud"));

    if (!lat || !lng) return;

    const nuevo = [...puntos, { lat, lng, orden: puntos.length + 1 }];
    setValue("puntos", nuevo);
  };

  const removePunto = (orden: number) => {
    const filtrados = puntos
      .filter((p) => p.orden !== orden)
      .map((p, i) => ({ ...p, orden: i + 1 }));

    setValue("puntos", filtrados);
  };

  const submit = (data: RutaOperativaFormData) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(submit)} className="form">

      <div>
        <label>Nombre de la ruta</label>
        <input {...register("nombre")} />
        {errors.nombre && <span>{errors.nombre.message}</span>}
      </div>

      <div>
        <label>Operador asignado</label>
        <input
          type="number"
          {...register("operadorId", { valueAsNumber: true })}
        />
        {errors.operadorId && <span>{errors.operadorId.message}</span>}
      </div>

      <div>
        <label>Puntos de la ruta</label>

        <button type="button" onClick={addPunto}>
          Agregar punto
        </button>

        {puntos.length === 0 && <p>No hay puntos agregados</p>}

        <ul>
          {puntos.map((p) => (
            <li key={p.orden}>
              #{p.orden} — Lat: {p.lat}, Lng: {p.lng}
              <button
                type="button"
                onClick={() => removePunto(p.orden)}
                style={{ marginLeft: "10px" }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        {errors.puntos && <span>{errors.puntos.message}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar ruta operativa"}
      </button>
    </form>
  );
}
