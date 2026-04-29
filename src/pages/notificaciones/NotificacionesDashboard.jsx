import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { KPI } from "../../components/dashboard/KPI";
import { useDashboardData } from "../../hooks/useDashboardData";

const COLORS = ["#dc2626", "#f59e0b", "#16a34a", "#2563eb"];

export default function NotificacionesDashboard() {
  const { data, loading, error } = useDashboardData({
    url: "/api/dashboard/notificaciones",
    initialData: {
      kpis: {
        criticas: 0,
        pendientes: 0,
        resueltasHoy: 0,
        promedioRespuestaMin: 0,
      },
      timeline: [],
      porTipo: [],
      lista: [],
    },
  });

  const { kpis, timeline, porTipo, lista } = data;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard de Notificaciones</h1>

      {loading && <p className="text-gray-500">Cargando datos...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPI title="Críticas" value={kpis.criticas} color="red" trend="+1%" />
        <KPI title="Pendientes" value={kpis.pendientes} color="yellow" trend="+3%" />
        <KPI title="Resueltas hoy" value={kpis.resueltasHoy} color="green" trend="+7%" />
        <KPI
          title="Tiempo prom. respuesta (min)"
          value={kpis.promedioRespuestaMin}
          color="blue"
          trend="-5%"
        />
      </div>

      {/* Línea: notificaciones por hora/día */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Notificaciones en el tiempo</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={timeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pastel: distribución por tipo */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Distribución por tipo</h2>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={porTipo} dataKey="value" outerRadius={90} label>
              {porTipo.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Lista de notificaciones */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Notificaciones recientes</h2>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {lista.map((n) => (
            <div
              key={n.id}
              className="border rounded-md p-3 flex items-start justify-between hover:bg-gray-50"
            >
              <div>
                <p className="text-sm font-semibold">
                  [{n.tipo}] {n.titulo}
                </p>
                <p className="text-xs text-gray-500 mt-1">{n.descripcion}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {n.fecha} · {n.origen}
                </p>
              </div>
              <span
                className={
                  "text-xs px-2 py-1 rounded-full ml-4 " +
                  (n.estado === "pendiente"
                    ? "bg-yellow-100 text-yellow-700"
                    : n.estado === "critica"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700")
                }
              >
                {n.estado}
              </span>
            </div>
          ))}
          {lista.length === 0 && !loading && (
            <p className="text-center text-gray-400 text-sm">Sin notificaciones recientes.</p>
          )}
        </div>
      </div>
    </div>
  );
}
