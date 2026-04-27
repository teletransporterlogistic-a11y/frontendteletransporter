export default function MovimientosKPIs({ movimientos }) {
  const entrada = movimientos.filter((m) => m.tipo === "ENTRADA").length;
  const picking = movimientos.filter((m) => m.tipo === "PICKING").length;
  const packing = movimientos.filter((m) => m.tipo === "PACKING").length;
  const salida = movimientos.filter((m) => m.tipo === "SALIDA").length;
  const ajustes = movimientos.filter((m) => m.tipo === "AJUSTE").length;

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <h3>Entradas</h3>
        <span>{entrada}</span>
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
        <h3>Salidas</h3>
        <span>{salida}</span>
      </div>

      <div className="kpi-card">
        <h3>Ajustes</h3>
        <span>{ajustes}</span>
      </div>
    </div>
  );
}
