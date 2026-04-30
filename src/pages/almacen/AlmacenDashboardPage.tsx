// src/pages/almacen/AlmacenDashboardPage.tsx
import { useState } from "react";

import { useCentrosOperativos } from "@/hooks/centros/useCentrosOperativos";
import {
  useAlmacenKPIs,
  useProductividadOperadores,
  useAlmacenHeatmap
} from "@/hooks/almacen/useAlmacenDashboard";

import DashboardKPIs from "@/components/almacen/DashboardKPIs";
import OperadoresProductividadTable from "@/components/almacen/OperadoresProductividadTable";
import AlmacenHeatmap from "@/components/almacen/AlmacenHeatmap";

// ===============================
// Tipos
// ===============================
interface CentroOperativo {
  id: number;
  nombre: string;
}

export default function AlmacenDashboardPage() {
  const [centroOperativoId, setCentroOperativoId] = useState<number | undefined>(
    undefined
  );

  // ===============================
  // Hooks de datos
  // ===============================
  const { data: centros } = useCentrosOperativos({ page: 1, pageSize: 999 });

  const { data: kpis } = useAlmacenKPIs(centroOperativoId);
  const { data: operadores } = useProductividadOperadores(centroOperativoId);
  const { data: heatmap } = useAlmacenHeatmap(centroOperativoId);

  // ===============================
  // Render
  // ===============================
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

          {centros?.data?.map((c: CentroOperativo) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* KPIs */}
      <DashboardKPIs kpis={kpis ?? null} />

      <div className="dashboard-grid">
        {/* Productividad */}
        <div className="dashboard-left">
          <h2>Productividad por operador</h2>
          <OperadoresProductividadTable operadores={operadores ?? []} />
        </div>

        {/* Heatmap */}
        <div className="dashboard-right">
          <h2>Heatmap de actividad</h2>
          <div style={{ height: 400 }}>
            <AlmacenHeatmap puntos={heatmap ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
