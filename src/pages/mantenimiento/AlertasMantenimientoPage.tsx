// src/pages/mantenimiento/AlertasMantenimientoPage.tsx
import { useEffect, useState } from "react";
import { obtenerAlertasServicios } from "@/services/alertas-mantenimiento.service";
import BotonRegresar from "@/components/BotonRegresar";
import "./Mantenimiento.css";

// ===============================
// Tipos
// ===============================
interface AlertaMantenimiento {
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
export default function AlertasMantenimientoPage() {
  const [alertas, setAlertas] = useState<AlertaMantenimiento[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    async function cargar() {
      setCargando(true);
      try {
        const data = await obtenerAlertasServicios();
        setAlertas(data);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  function getEstadoClase(estado: AlertaMantenimiento["estado"]) {
    if (estado === "VENCIDO") return "badge badge-red";
    if (estado === "PROXIMO") return "badge badge-yellow";
    return "badge badge-green";
  }

  return (
    <div className="mantenimiento-wrapper">
      <BotonRegresar />
      <h2>Alertas de servicio preventivo</h2>

      <div className="card">
        {cargando ? (
          <div>Cargando...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Unidad</th>
                <th>Km actual</th>
                <th>Próximo servicio</th>
                <th>Faltan (km)</th>
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
                    <span className={getEstadoClase(a.estado)}>
                      {a.estado}
                    </span>
                  </td>
                </tr>
              ))}

              {alertas.length === 0 && (
                <tr>
                  <td colSpan={5} className="no-data">
                    No hay alertas de servicio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
