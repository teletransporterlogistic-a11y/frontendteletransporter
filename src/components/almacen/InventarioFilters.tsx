export default function InventarioFilters({
  filters,
  setFilters,
  centros,
}) {
  return (
    <div className="filters-container">
      <select
        value={filters.centroOperativoId ?? ""}
        onChange={(e) =>
          setFilters((f) => ({
            ...f,
            centroOperativoId: e.target.value
              ? Number(e.target.value)
              : undefined,
          }))
        }
      >
        <option value="">Todos los centros</option>
        {centros.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      <select
        value={filters.estado ?? ""}
        onChange={(e) =>
          setFilters((f) => ({
            ...f,
            estado: e.target.value || undefined,
          }))
        }
      >
        <option value="">Todos los estados</option>
        <option value="EN_ALMACEN">En almacén</option>
        <option value="PICKING">Picking</option>
        <option value="PACKING">Packing</option>
        <option value="SALIDA">Salida</option>
      </select>
    </div>
  );
}
