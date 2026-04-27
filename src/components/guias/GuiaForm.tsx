import { GuiaFormData } from "../../validation/guia.schema";

export default function GuiaForm({
  form,
  errors,
  updateField,
  onSubmit,
  loading,
  municipios,
}: {
  form: GuiaFormData;
  errors: Record<string, string>;
  updateField: (field: keyof GuiaFormData, value: any) => void;
  onSubmit: () => void;
  loading: boolean;
  municipios: { id: number; nombre: string }[];
}) {
  return (
    <div className="form-container">
      <h2>Guía</h2>

      <input
        placeholder="Código"
        value={form.codigo}
        onChange={(e) => updateField("codigo", e.target.value)}
      />
      {errors.codigo && <span className="error">{errors.codigo}</span>}

      <select
        value={form.municipioId}
        onChange={(e) => updateField("municipioId", Number(e.target.value))}
      >
        <option value="">Seleccione municipio</option>
        {municipios.map((m) => (
          <option key={m.id} value={m.id}>
            {m.nombre}
          </option>
        ))}
      </select>

      <h3>Dimensiones</h3>

      <input
        type="number"
        placeholder="Peso"
        value={form.peso}
        onChange={(e) => updateField("peso", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Largo"
        value={form.largo}
        onChange={(e) => updateField("largo", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Ancho"
        value={form.ancho}
        onChange={(e) => updateField("ancho", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Alto"
        value={form.alto}
        onChange={(e) => updateField("alto", Number(e.target.value))}
      />

      <div className="metric-box">
        <p>Peso predominante: {form.peso_predominante} kg</p>
        <p>Costo: ${form.costo}</p>
      </div>

      <h3>Remitente</h3>

      <input
        placeholder="Nombre"
        value={form.remitente_nombre ?? ""}
        onChange={(e) => updateField("remitente_nombre", e.target.value)}
      />

      <input
        placeholder="Teléfono"
        value={form.remitente_telefono ?? ""}
        onChange={(e) => updateField("remitente_telefono", e.target.value)}
      />

      <input
        placeholder="Dirección"
        value={form.remitente_direccion ?? ""}
        onChange={(e) => updateField("remitente_direccion", e.target.value)}
      />

      <h3>Destinatario</h3>

      <input
        placeholder="Nombre"
        value={form.destinatario_nombre ?? ""}
        onChange={(e) => updateField("destinatario_nombre", e.target.value)}
      />

      <input
        placeholder="Teléfono"
        value={form.destinatario_telefono ?? ""}
        onChange={(e) => updateField("destinatario_telefono", e.target.value)}
      />

      <input
        placeholder="Dirección"
        value={form.destinatario_direccion ?? ""}
        onChange={(e) => updateField("destinatario_direccion", e.target.value)}
      />

      <button onClick={onSubmit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </div>
  );
}
