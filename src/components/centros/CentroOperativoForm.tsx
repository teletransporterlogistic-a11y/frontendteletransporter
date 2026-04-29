import { CentroOperativo } from "../../types/centro-operativo";

export default function CentroOperativoForm({
  form,
  errors,
  updateField,
  onSubmit,
  loading,
}: {
  form: CentroOperativo;
  errors: Record<string, string>;
  updateField: (field: keyof CentroOperativo, value: any) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  return (
    <div className="form-container">
      <h2>Centro Operativo</h2>

      <input
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => updateField("nombre", e.target.value)}
      />
      {errors.nombre && <span className="error">{errors.nombre}</span>}

      <input
        placeholder="Clave"
        value={form.clave}
        onChange={(e) => updateField("clave", e.target.value)}
      />
      {errors.clave && <span className="error">{errors.clave}</span>}

      <input
        placeholder="Ciudad"
        value={form.ciudad}
        onChange={(e) => updateField("ciudad", e.target.value)}
      />

      <input
        placeholder="Estado"
        value={form.estado}
        onChange={(e) => updateField("estado", e.target.value)}
      />

      <input
        placeholder="Dirección"
        value={form.direccion ?? ""}
        onChange={(e) => updateField("direccion", e.target.value)}
      />

      <select
        value={form.activo ? "true" : "false"}
        onChange={(e) => updateField("activo", e.target.value === "true")}
      >
        <option value="true">Activo</option>
        <option value="false">Inactivo</option>
      </select>

      <button onClick={onSubmit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </div>
  );
}
