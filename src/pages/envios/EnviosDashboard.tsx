// src/pages/dashboard/EnviosDashboard.tsx
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
  Cell
} from "recharts";

// ===============================
// Tipos
// ===============================
interface LineData {
  day: string;
  envios: number;
}

interface BarData {
  status: string;
  value: number;
}

interface PieData {
  name: string;
  value: number;
}

interface KPIProps {
  title: string;
  value: string | number;
  trend: string;
  color: "blue" | "green" | "red" | "yellow";
}

// ===============================
// Componente principal
// ===============================
export default function EnviosDashboard() {
  const dataLine: LineData[] = [
    { day: "Lun", envios: 120 },
    { day: "Mar", envios: 98 },
    { day: "Mié", envios: 140 },
    { day: "Jue", envios: 110 },
    { day: "Vie", envios: 160 }
  ];

  const dataBar: BarData[] = [
    { status: "Entregados", value: 540 },
    { status: "En tránsito", value: 320 },
    { status: "Incidencias", value: 24 },
    { status: "Pendientes", value: 78 }
  ];

  const dataPie: PieData[] = [
    { name: "Morelia", value: 320 },
    { name: "Zamora", value: 180 },
    { name: "Uruapan", value: 140 },
    { name: "Lázaro Cárdenas", value: 90 }
  ];

  const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard de Envíos</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPI title="Envíos del día" value="128" trend="+12%" color="blue" />
        <KPI title="En tránsito" value="89" trend="-4%" color="yellow" />
        <KPI title="Entregados" value="54" trend="+8%" color="green" />
        <KPI title="Incidencias" value="6" trend="+2%" color="red" />
      </div>

      {/* Gráfica de línea */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Envíos por día</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dataLine}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="envios"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica de barras */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Estado de los envíos</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataBar}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica de pastel */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Distribución por municipio</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={dataPie} dataKey="value" outerRadius={90} label>
              {dataPie.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ===============================
// KPI Component
// ===============================
function KPI({ title, value, trend, color }: KPIProps) {
  const colorMap: Record<KPIProps["color"], string> = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600"
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <p className="text-gray-500">{title}</p>
      <p className={`text-4xl font-bold ${colorMap[color]}`}>{value}</p>
      <p className="text-sm text-gray-400">Tendencia: {trend}</p>
    </div>
  );
}
