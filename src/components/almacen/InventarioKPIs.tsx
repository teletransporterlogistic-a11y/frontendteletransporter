export default function InventarioKPIs({ inventario }) {
  const total = inventario.length;
  const enAlmacen = inventario.filter((i) => i.estado === "EN_ALMACEN").length;
  const picking = inventario.filter((i) => i.estado === "PICKING").length;
  const packing = inventario.filter((i) => i.estado === "PACKING").length;
  const salida = inventario.filter((i) => i.estado === "SALIDA").length;

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <h3>Total</h3>
        <span>{total}</span>
      </div>

      <div className="kpi-card">
        <h3>En almacén</h3>
        <span>{enAlmacen}</span>
      </div>

      <div className="kpi-card">
        <h3>Picking</h3>
        <span>{picking}</span>
      </div>

      <div className="kpi-card">
        <h3>Packing</h3>
        <span>{packing}</span>
      </div>

      <div className="kpi-card">
        <h3>Salida</h3>
        <span>{salida}</span>
      </div>
    </div>
  );
}
