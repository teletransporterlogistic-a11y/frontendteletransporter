// src/components/dashboard/EnviosCharts.tsx
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import "./EnviosCharts.css";

// ===============================
// Registro de Chart.js
// ===============================
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

// ===============================
// Tipos
// ===============================
export interface Envio {
  id: number;
  fechaCreacion: string;
  estadoActualId: number;
}

interface Props {
  envios: Envio[];
}

interface EnviosPorDia {
  dia: string;
  total: number;
}

interface EstadosMap {
  [estadoId: number]: number;
}

// ===============================
// Componente
// ===============================
export default function EnviosCharts({ envios }: Props) {
  const porDia = agruparPorDia(envios);
  const porEstado = agruparPorEstado(envios);

  const barData = {
    labels: porDia.map((d) => d.dia),
    datasets: [
      {
        label: "Envíos",
        data: porDia.map((d) => d.total),
        backgroundColor: "#2563EB",
        borderRadius: 6,
      },
    ],
  };

  const lineData = {
    labels: porDia.map((d) => d.dia),
    datasets: [
      {
        label: "Tendencia",
        data: porDia.map((d) => d.total),
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ["Creado", "En tránsito", "En ruta", "Entregado", "Incidencia"],
    datasets: [
      {
        data: [
          porEstado[1] || 0,
          porEstado[2] || 0,
          porEstado[3] || 0,
          porEstado[4] || 0,
          porEstado[5] || 0,
        ],
        backgroundColor: [
          "#6B7280",
          "#2563EB",
          "#D97706",
          "#059669",
          "#DC2626",
        ],
      },
    ],
  };

  return (
    <div className="envios-charts-wrapper">
      <h2 className="charts-title">Estadísticas de Envíos</h2>

      <div className="envios-charts-grid">
        <div className="envios-chart-card">
          <h3 className="chart-title">Envíos por día</h3>
          <div className="envios-chart-container">
            <Bar data={barData} />
          </div>
        </div>

        <div className="envios-chart-card">
          <h3 className="chart-title">Tendencia</h3>
          <div className="envios-chart-container">
            <Line data={lineData} />
          </div>
        </div>

        <div className="envios-chart-card">
          <h3 className="chart-title">Estados</h3>
          <div className="envios-chart-container">
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ===============================
// Helpers
// ===============================
function agruparPorDia(envios: Envio[]): EnviosPorDia[] {
  const map: Record<string, number> = {};

  envios.forEach((e) => {
    const dia = new Date(e.fechaCreacion).toLocaleDateString();
    map[dia] = (map[dia] || 0) + 1;
  });

  return Object.entries(map).map(([dia, total]) => ({ dia, total }));
}

function agruparPorEstado(envios: Envio[]): EstadosMap {
  const map: EstadosMap = {};

  envios.forEach((e) => {
    map[e.estadoActualId] = (map[e.estadoActualId] || 0) + 1;
  });

  return map;
}
