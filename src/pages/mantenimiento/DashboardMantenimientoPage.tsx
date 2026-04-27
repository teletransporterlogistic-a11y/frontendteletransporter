// src/pages/mantenimiento/DashboardMantenimientoPage.tsx
import { useEffect, useState } from "react";
import api from "@/api/api";
import BotonRegresar from "@/components/BotonRegresar";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import "./Mantenimiento.css";

// ===============================
// Tipos
// ===============================
interface Unidad {
  id: number;
  nombre: string;
  rendimientoKmL?: number;
}

interface ResumenCombustible {
  totalLitros: number;
  totalCosto: number;
  rendimientoPromedio: number;
}

interface AlertaServicio {
  unidadId: number;
  unidad: string;
  kmActual: number;
  proximoServicioKm: number;
  faltanKm: number;
  estado: "OK" | "PROXIMO" | "VENCIDO";
}

// ===============================
// Componente
// ===============================
export default function DashboardMantenimientoPage() {
  const [unidades, setUnidades] = useState<Unidad[]>([]);
  const [resumenCombustible, setResumenCombustible] = useState<ResumenCombustible>({
    totalLitros: 0,
    totalCosto: 0,
    rendimientoPromedio: 0
  });

  const [alertas, setAlertas] = useState<AlertaServicio[]>([]);

  useEffect(() => {
    async function cargar() {
      try {
        const u = await api.get("/unidades");
        setUnidades(u.data);

        const r = await api.get("/combustible/resumen");
        setResumenCombustible(r.data);

        const a = await api.get("/servicios/alertas");
        setAlertas(a.data);
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      }
    }

    cargar();
  }, []);

  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

  return (
    <div className="mantenimiento-wrapper">
      <BotonRegresar />
      <h2>Dashboard de Mantenimiento</h2>

      {/* KPIs */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>Total litros</h3>
          <p>{resumenCombustible.totalLitros?.toFixed(2) ?? "0.00"} L</p>
        </div>

        <div className="kpi-card">
          <h3>Total gastado</h3>
          <p>${resumenCombustible.totalCosto?.toFixed(2) ?? "0.00"}</p>
        </div>

        <div className="kpi-card">
          <h3>Rendimiento promedio</h3>
          <p>{resumenCombustible.rendimientoPromedio?.toFixed(2) ?? "0.00"} km/L</p>
        </div>

        <div className="kpi-card">
          <h3>Unidades activas</h3>
          <p>{unidades.length}</p>
        </div>
      </div>

      {/* Gráfica de rendimiento */}
      <div className="card">
        <h3>Rendimiento por unidad (km/L)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={unidades}>
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rendimientoKmL" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica de alertas */}
      <div className="card">
        <h3>Estado de servicios preventivos</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: "OK", value: alertas.filter(a => a.estado === "OK").length },
                { name: "Próximo", value: alertas.filter(a => a.estado === "PROXIMO").length },
                { name: "Vencido", value: alertas.filter(a => a.estado === "VENCIDO").length }
              ]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {COLORS.map((c, i) => (
                <Cell key={i} fill={c} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de alertas */}
      <div className="card">
        <h3>Alertas de servicio</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Unidad</th>
              <th>Km actual</th>
              <th>Próximo servicio</th>
              <th>Faltan</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {alertas.map((a) => (
              <tr key={a.unidadId}>
                <td>{a.unidad}</td>
                <td>{a.kmActual}</td>
                <td>{a.proximoServicioKm}</td>
                <td>{a.faltanKm}</td>
                <td>
                  <span className={`badge badge-${a.estado.toLowerCase()}`}>
                    {a.estado}
                  </span>
                </td>
              </tr>
            ))}

            {alertas.length === 0 && (
              <tr>
                <td colSpan={5} className="no-data">
                  No hay alertas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
