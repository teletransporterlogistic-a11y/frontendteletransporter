import React, { useEffect, useState } from "react";
import { obtenerEstadisticas } from "../services/estadisticasService";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function DashboardOperadores({ token }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const stats = await obtenerEstadisticas(token);
      setData(stats);
    } catch (err) {
      console.error(err);
    }
  };

  const labels = data.map((op) => op.operador);

  const barData = {
    labels,
    datasets: [
      {
        label: "Paquetes asignados",
        data: data.map((op) => op.asignados),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: "Eventos hoy",
        data: data.map((op) => op.eventosHoy),
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FFC107",
          "#FF5722",
          "#9C27B0",
          "#00BCD4",
        ],
      },
    ],
  };

  const horas = data[0]?.actividadPorHora?.map((h) => h.hora) || [];

  const lineData = {
    labels: horas,
    datasets: data.map((op, i) => ({
      label: op.operador,
      data: op.actividadPorHora?.map((h) => h.eventos) || [],
      borderColor: [
        "#4CAF50",
        "#2196F3",
        "#FFC107",
        "#FF5722",
        "#9C27B0",
        "#00BCD4",
      ][i % 6],
      borderWidth: 3,
      tension: 0.3,
    })),
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow space-y-10">
      <h2 className="text-3xl font-bold text-gray-700">Dashboard de Operadores</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Operador</th>
            <th className="p-3">Paquetes asignados</th>
            <th className="p-3">Eventos hoy</th>
            <th className="p-3">Último evento</th>
          </tr>
        </thead>

        <tbody>
          {data.map((op, i) => (
            <tr key={i} className="border-b">
              <td className="p-3 font-semibold">{op.operador}</td>
              <td className="p-3">{op.asignados}</td>
              <td className="p-3">{op.eventosHoy}</td>
              <td className="p-3">
                {op.ultimoEvento
                  ? `${op.ultimoEvento.hora} — ${op.ultimoEvento.descripcion}`
                  : "Sin actividad"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3 className="text-xl font-bold mb-3">Paquetes asignados por operador</h3>
        <Bar data={barData} />
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">Eventos hoy por operador</h3>
        <Pie data={pieData} />
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">Actividad por hora (hoy)</h3>
        <Line data={lineData} />
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">Ranking de operadores (hoy)</h3>

        {data
          .slice()
          .sort((a, b) => b.eventosHoy - a.eventosHoy)
          .map((op, i) => (
            <div key={i} className="p-3 border rounded mb-2">
              <strong>{i + 1}. {op.operador}</strong> — {op.eventosHoy} eventos
            </div>
          ))}
      </div>
    </div>
  );
}