import { Operador } from "../../types/operador";

export default function OperadorForm({
  form,
  errors,
  updateField,
  onSubmit,
  loading,
}: {
  form: Operador;
  errors: Record<string, string>;
  updateField: (field: keyof Operador, value: any) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  return (
    <div className="form-container">
      <h2>Operador</h2>

      <input
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => updateField("nombre", e.target.value)}
      />
      {errors.nombre && <span className="error">{errors.nombre}</span>}

      <input
        placeholder="Teléfono"
        value={form.telefono ?? ""}
        onChange={(e) => updateField("telefono", e.target.value)}
      />

      <input
        placeholder="Correo"
        value={form.correo ?? ""}
        onChange={(e) => updateField("correo", e.target.value)}
      />

      <input
        placeholder="Licencia"
        value={form.licencia ?? ""}
        onChange={(e) => updateField("licencia", e.target.value)}
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
