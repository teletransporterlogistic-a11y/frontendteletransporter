import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rol, rolSchema } from "../../validation/rol.schema";

type Props = {
  initial?: Partial<Rol>;
  onSubmit: (data: Rol) => void;
  loading: boolean;
  backendError?: string;
};

export default function RolForm({ initial, onSubmit, loading, backendError }: Props) {
  const SUPERADMIN_ID = 1;
  const isSuperAdmin = initial?.id === SUPERADMIN_ID;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Rol>({
    resolver: zodResolver(rolSchema),
    defaultValues: {
      id: initial?.id,
      nombre: initial?.nombre || "",
      tenant: initial?.tenant || "",
    },
  });

  const submit = (data: Rol) => {
    if (isSuperAdmin) return; // SUPERADMIN NO SE EDITA
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="form-container space-y-4">

      <h2 className="text-xl font-bold">Rol</h2>

      {backendError && (
        <div className="text-red-600 font-semibold">{backendError}</div>
      )}

      <div>
        <label>Nombre del rol</label>
        <input
          {...register("nombre")}
          disabled={isSuperAdmin}
          className="input"
          placeholder="Administrador, Operador, etc."
        />
        {errors.nombre && <span className="error">{errors.nombre.message}</span>}
      </div>

      <div>
        <label>Tenant</label>
        <input
          {...register("tenant")}
          disabled={isSuperAdmin}
          className="input"
          placeholder="teletransporter"
        />
        {errors.tenant && <span className="error">{errors.tenant.message}</span>}
      </div>

      <button
        type="submit"
        disabled={loading || isSuperAdmin}
        className="btn-primary w-full"
      >
        {isSuperAdmin
          ? "Este rol no puede modificarse"
          : loading
          ? "Guardando..."
          : "Guardar"}
      </button>
    </form>
  );
}
