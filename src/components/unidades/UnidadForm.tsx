import { Unidad } from "../../types/unidad";

export default function UnidadForm({
  form,
  errors,
  updateField,
  onSubmit,
  loading,
}: {
  form: Unidad;
  errors: Record<string, string>;
  updateField: (field: keyof Unidad, value: any) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  return (
    <div className="form-container">
      <h2>Unidad</h2>

      <input
        placeholder="ID de unidad"
        value={form.unidadId}
        onChange={(e) => updateField("unidadId", e.target.value)}
      />
      {errors.unidadId && <span className="error">{errors.unidadId}</span>}

      <input
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => updateField("nombre", e.target.value)}
      />

      <input
        placeholder="Tipo"
        value={form.tipo}
        onChange={(e) => updateField("tipo", e.target.value)}
      />

      <select
        value={form.estado}
        onChange={(e) => updateField("estado", e.target.value)}
      >
        <option value="ACTIVA">Activa</option>
        <option value="INACTIVA">Inactiva</option>
        <option value="MANTENIMIENTO">Mantenimiento</option>
      </select>

      <input
        type="number"
        placeholder="Kilómetros acumulados"
        value={form.kmAcumulados}
        onChange={(e) => updateField("kmAcumulados", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Rendimiento Km/L"
        value={form.rendimientoKmL}
        onChange={(e) => updateField("rendimientoKmL", Number(e.target.value))}
      />

      <input
        type="date"
        placeholder="Último servicio"
        value={form.ultimoServicio ?? ""}
        onChange={(e) => updateField("ultimoServicio", e.target.value)}
      />

      <input
        type="date"
        placeholder="Próximo servicio"
        value={form.proximoServicio ?? ""}
        onChange={(e) => updateField("proximoServicio", e.target.value)}
      />

      <button onClick={onSubmit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </div>
  );
}
