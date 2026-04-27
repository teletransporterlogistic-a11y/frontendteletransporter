export default function RastreoFilters({
  filters,
  setFilters,
  unidades,
  rutas,
  centros,
}) {
  const handleSelect = (field, value) => {
    setFilters((f) => ({
      ...f,
      [field]: value ? Number(value) : undefined,
    }));
  };

  return (
    <div
      className="rastreo-filters"
      style={{
        display: "flex",
        gap: 10,
        padding: 10,
        background: "#0f172a",
        borderBottom: "1px solid #1f2937",
      }}
    >
      {/* Unidades */}
      <select
        value={filters.unidadId ?? ""}
        onChange={(e) => handleSelect("unidadId", e.target.value)}
        style={selectStyle}
      >
        <option value="">Todas las unidades</option>
        {unidades
          ?.slice()
          .sort((a, b) => a.nombre.localeCompare(b.nombre))
          .map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre}
            </option>
          ))}
      </select>

      {/* Rutas */}
      <select
        value={filters.rutaId ?? ""}
        onChange={(e) => handleSelect("rutaId", e.target.value)}
        style={selectStyle}
      >
        <option value="">Todas las rutas</option>
        {rutas
          ?.slice()
          .sort((a, b) => a.nombre.localeCompare(b.nombre))
          .map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
      </select>

      {/* Centros Operativos */}
      <select
        value={filters.centroOperativoId ?? ""}
        onChange={(e) => handleSelect("centroOperativoId", e.target.value)}
        style={selectStyle}
      >
        <option value="">Todos los centros</option>
        {centros
          ?.slice()
          .sort((a, b) => a.nombre.localeCompare(b.nombre))
          .map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
      </select>
    </div>
  );
}

const selectStyle = {
  fontSize: 13,
  padding: "6px 8px",
  background: "#020617",
  color: "#e5e7eb",
  border: "1px solid #1e293b",
  borderRadius: 6,
  cursor: "pointer",
  minWidth: 160,
};
