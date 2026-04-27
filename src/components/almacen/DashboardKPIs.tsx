import { AlmacenKPI } from "../../types/almacenDashboard";

export default function DashboardKPIs({ kpis }: { kpis: AlmacenKPI | undefined }) {
  if (!kpis) return null;

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <h3>Inventario total</h3>
        <span>{kpis.totalInventario}</span>
      </div>
      <div className="kpi-card">
        <h3>Movimientos hoy</h3>
        <span>{kpis.movimientosHoy}</span>
      </div>
      <div className="kpi-card">
        <h3>Picking hoy</h3>
        <span>{kpis.pickingHoy}</span>
      </div>
      <div className="kpi-card">
        <h3>Packing hoy</h3>
        <span>{kpis.packingHoy}</span>
      </div>
      <div className="kpi-card">
        <h3>Salidas hoy</h3>
        <span>{kpis.salidasHoy}</span>
      </div>
    </div>
  );
}
