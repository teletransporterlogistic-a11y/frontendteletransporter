import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  usuarioSchema,
  UsuarioFormData,
} from "../../validation/usuario.schema";
import api from "../../api/api.js";

type Props = {
  initial?: Partial<UsuarioFormData>;
  onSubmit: (data: UsuarioFormData) => void;
  loading?: boolean;
};

function UsuarioForm({ initial, onSubmit, loading }: Props) {
  const [roles, setRoles] = useState([]);
  const [backendError, setBackendError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      rolId: 0,
      password: "",
      ...initial,
    },
  });

  // Cargar roles desde el backend
  useEffect(() => {
    async function loadRoles() {
      try {
        const data = await api.get("/roles");
        setRoles(data);
      } catch (err) {
        console.error("Error cargando roles:", err);
      }
    }
    loadRoles();
  }, []);

  const submit = async (data: UsuarioFormData) => {
    try {
      setBackendError("");

      // Si estamos editando, no obligamos password
      if (initial?.id && !data.password) {
        delete data.password;
      }

      await onSubmit(data);
    } catch (err: any) {
      setBackendError(err.message || "Error al guardar usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="form space-y-4">

      {backendError && (
        <div className="text-red-600 font-semibold">{backendError}</div>
      )}

      <div>
        <label>Nombre</label>
        <input {...register("nombre")} className="input" />
        {errors.nombre && <span className="text-red-600">{errors.nombre.message}</span>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register("email")} className="input" />
        {errors.email && <span className="text-red-600">{errors.email.message}</span>}
      </div>

      <div>
        <label>Teléfono</label>
        <input {...register("telefono")} className="input" />
        {errors.telefono && <span className="text-red-600">{errors.telefono.message}</span>}
      </div>

      <div>
        <label>Rol</label>
        <select {...register("rolId", { valueAsNumber: true })} className="input">
          <option value="">Seleccione un rol</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
        </select>
        {errors.rolId && <span className="text-red-600">{errors.rolId.message}</span>}
      </div>

      <div>
        <label>
          Contraseña{" "}
          {initial?.id && <span className="text-gray-500">(opcional al editar)</span>}
        </label>
        <input type="password" {...register("password")} className="input" />
        {errors.password && <span className="text-red-600">{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Guardando..." : "Guardar usuario"}
      </button>
    </form>
  );
}

export default UsuarioForm;
