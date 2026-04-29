import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { KPI } from "../../components/dashboard/KPI";
import { useDashboardData } from "../../hooks/useDashboardData";

export default function OperadoresDashboard() {
  const { data, loading, error } = useDashboardData({
    url: "/api/dashboard/operadores",
    initialData: {
      kpis: {
        activos: 0,
        enRuta: 0,
        inactivos: 0,
        promedioEntregasDia: 0,
      },
      rendimientoPorOperador: [],
      rendimientoPorZona: [],
      operadoresTabla: [],
    },
  });

  const { kpis, rendimientoPorOperador, rendimientoPorZona, operadoresTabla } = data;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard de Operadores</h1>

      {loading && <p className="text-gray-500">Cargando datos...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPI title="Operadores activos" value={kpis.activos} color="green" trend="+3%" />
        <KPI title="En ruta" value={kpis.enRuta} color="blue" trend="+1%" />
        <KPI title="Inactivos" value={kpis.inactivos} color="red" trend="-2%" />
        <KPI
          title="Entregas promedio / día"
          value={kpis.promedioEntregasDia}
          color="yellow"
          trend="+5%"
        />
      </div>

      {/* Gráfica de barras: rendimiento por operador */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Rendimiento por operador (entregas)</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={rendimientoPorOperador}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="entregas" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica radar: rendimiento por zona */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Rendimiento por zona</h2>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={rendimientoPorZona}>
            <PolarGrid />
            <PolarAngleAxis dataKey="zona" />
            <PolarRadiusAxis />
            <Radar
              name="Entregas"
              dataKey="entregas"
              stroke="#16a34a"
              fill="#16a34a"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de operadores */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Operadores</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2">Nombre</th>
                <th className="text-left py-2 px-2">Estatus</th>
                <th className="text-left py-2 px-2">Envíos hoy</th>
                <th className="text-left py-2 px-2">Zona</th>
              </tr>
            </thead>
            <tbody>
              {operadoresTabla.map((op) => (
                <tr key={op.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2">{op.nombre}</td>
                  <td className="py-2 px-2">{op.estatus}</td>
                  <td className="py-2 px-2">{op.enviosHoy}</td>
                  <td className="py-2 px-2">{op.zona}</td>
                </tr>
              ))}
              {operadoresTabla.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-400">
                    Sin datos de operadores.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
