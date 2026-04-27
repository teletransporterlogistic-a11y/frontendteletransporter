// src/pages/dashboard/Dashboard.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  useDashboardMetrics,
  useGuiasPorMes,
  useEntregasPorZona,
  useGuiasPorMunicipio,
} from "../../hooks/dashboard/useDashboard";

import "./dashboard.css";

const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const { data: metrics, isLoading: loadingMetrics } = useDashboardMetrics();
  const { data: guiasMes, isLoading: loadingLine } = useGuiasPorMes();
  const { data: entregasZona, isLoading: loadingBar } = useEntregasPorZona();
  const { data: guiasMunicipio, isLoading: loadingPie } = useGuiasPorMunicipio();

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Tarjetas */}
      <div className="dashboard-cards">
        <div className="card">
          <h3>Clientes</h3>
          <p>{loadingMetrics ? "..." : metrics?.clientes}</p>
        </div>

        <div className="card">
          <h3>Guías</h3>
          <p>{loadingMetrics ? "..." : metrics?.guias}</p>
        </div>

        <div className="card">
          <h3>Rutas</h3>
          <p>{loadingMetrics ? "..." : metrics?.rutas}</p>
        </div>

        <div className="card">
          <h3>Ingresos</h3>
          <p>
            {loadingMetrics
              ? "..."
              : `$${metrics?.ingresos.toLocaleString()}`}
          </p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="dashboard-charts">

        {/* Línea */}
        <div className="chart-container">
          <h3>Guías por mes</h3>
          {loadingLine ? (
            <div>Cargando...</div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={guiasMes ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="guias"
                  stroke="#0088FE"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Barras */}
        <div className="chart-container">
          <h3>Entregas por zona</h3>
          {loadingBar ? (
            <div>Cargando...</div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={entregasZona ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="entregas" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie */}
        <div className="chart-container">
          <h3>Distribución por municipio</h3>
          {loadingPie ? (
            <div>Cargando...</div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={guiasMunicipio ?? []}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {(guiasMunicipio ?? []).map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
}
