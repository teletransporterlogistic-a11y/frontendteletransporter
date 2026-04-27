import { IncidenciaFormData } from "../../validation/incidencia.schema";

export default function IncidenciaForm({
  form,
  errors,
  updateField,
  onSubmit,
  loading,
  envios,
  operadores,
}: {
  form: IncidenciaFormData;
  errors: Record<string, string>;
  updateField: (field: keyof IncidenciaFormData, value: any) => void;
  onSubmit: () => void;
  loading: boolean;
  envios: any[];
  operadores: any[];
}) {
  return (
    <div className="form-container">
      <h2>Incidencia</h2>

      <select
        value={form.envioId}
        onChange={(e) => updateField("envioId", Number(e.target.value))}
      >
        <option value="">Seleccione envío</option>
        {envios.map((e) => (
          <option key={e.id} value={e.id}>
            {e.guia}
          </option>
        ))}
      </select>
      {errors.envioId && <span className="error">{errors.envioId}</span>}

      <select
        value={form.operadorId ?? ""}
        onChange={(e) => updateField("operadorId", Number(e.target.value))}
      >
        <option value="">Operador (opcional)</option>
        {operadores.map((o) => (
          <option key={o.id} value={o.id}>
            {o.nombre}
          </option>
        ))}
      </select>

      <select
        value={form.tipo}
        onChange={(e) => updateField("tipo", e.target.value)}
      >
        <option value="">Seleccione tipo</option>
        <option value="DANIO">Daño</option>
        <option value="DEMORA">Demora</option>
        <option value="NO_ENTREGADO">No entregado</option>
        <option value="OTRO">Otro</option>
      </select>
      {errors.tipo && <span className="error">{errors.tipo}</span>}

      <textarea
        placeholder="Descripción"
        value={form.descripcion}
        onChange={(e) => updateField("descripcion", e.target.value)}
      />
      {errors.descripcion && <span className="error">{errors.descripcion}</span>}

      <input
        placeholder="URL de evidencia"
        value={form.evidenciaUrl ?? ""}
        onChange={(e) => updateField("evidenciaUrl", e.target.value)}
      />

      <input
        type="number"
        placeholder="Latitud"
        value={form.lat ?? ""}
        onChange={(e) => updateField("lat", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Longitud"
        value={form.lng ?? ""}
        onChange={(e) => updateField("lng", Number(e.target.value))}
      />

      <select
        value={form.estado}
        onChange={(e) => updateField("estado", e.target.value)}
      >
        <option value="ABIERTA">Abierta</option>
        <option value="EN_PROCESO">En proceso</option>
        <option value="CERRADA">Cerrada</option>
      </select>

      <button onClick={onSubmit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </div>
  );
}
