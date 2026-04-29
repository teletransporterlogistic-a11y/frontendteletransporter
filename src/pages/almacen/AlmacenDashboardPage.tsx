import { useState } from "react";
import { useCentrosOperativos } from "../../hooks/centros/useCentrosOperativos";
import {
  useAlmacenKPIs,
  useProductividadOperadores,
  useAlmacenHeatmap,
} from "../../hooks/almacen/useAlmacenDashboard";

import DashboardKPIs from "../../components/almacen/DashboardKPIs";
import OperadoresProductividadTable from "../../components/almacen/OperadoresProductividadTable";
import AlmacenHeatmap from "../../components/almacen/AlmacenHeatmap";

export default function AlmacenDashboardPage() {
  const [centroOperativoId, setCentroOperativoId] = useState<number | undefined>(
    undefined
  );

  const { data: centros } = useCentrosOperativos({ page: 1, pageSize: 999 });
  const { data: kpis } = useAlmacenKPIs(centroOperativoId);
  const { data: operadores } = useProductividadOperadores(centroOperativoId);
  const { data: heatmap } = useAlmacenHeatmap(centroOperativoId);

  return (
    <div className="almacen-dashboard-layout">
      <div className="header-row">
        <h1>Dashboard de Almacén</h1>

        <select
          value={centroOperativoId ?? ""}
          onChange={(e) =>
            setCentroOperativoId(
              e.target.value ? Number(e.target.value) : undefined
            )
          }
        >
          <option value="">Todos los centros</option>
          {centros?.data?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      <DashboardKPIs kpis={kpis} />

      <div className="dashboard-grid">
        <div className="dashboard-left">
          <h2>Productividad por operador</h2>
          <OperadoresProductividadTable operadores={operadores} />
        </div>

        <div className="dashboard-right">
          <h2>Heatmap de actividad</h2>
          <div style={{ height: 400 }}>
            <AlmacenHeatmap puntos={heatmap} />
          </div>
        </div>
      </div>
    </div>
  );
}
