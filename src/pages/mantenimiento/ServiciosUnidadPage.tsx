// src/pages/mantenimiento/ServiciosUnidadPage.tsx
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
  crearServicioUnidad,
  listarServiciosUnidad,
} from "@/services/servicios-unidad.service";
import api from "@/api/api";
import BotonRegresar from "@/components/BotonRegresar";
import "./Mantenimiento.css";

// ===============================
// Tipos
// ===============================
interface Unidad {
  id: number;
  nombre: string;
  unidadId?: string;
}

interface ServicioUnidad {
  id: number;
  descripcion: string;
  costo: number;
  fecha: string;
}

// ===============================
// Componente
// ===============================
export default function ServiciosUnidadPage() {
  const [unidades, setUnidades] = useState<Unidad[]>([]);
  const [unidadId, setUnidadId] = useState<string>("");

  const [descripcion, setDescripcion] = useState("");
  const [costo, setCosto] = useState("");
  const [fecha, setFecha] = useState("");

  const [servicios, setServicios] = useState<ServicioUnidad[]>([]);
  const [cargando, setCargando] = useState(false);

  // ===============================
  // Cargar unidades
  // ===============================
  useEffect(() => {
    async function cargarUnidades() {
      try {
        const res = await api.get("/unidades");
        setUnidades(res.data);
      } catch (err) {
        console.error("Error cargando unidades:", err);
      }
    }
    cargarUnidades();
  }, []);

  // ===============================
  // Cargar servicios de la unidad seleccionada
  // ===============================
  async function cargarServicios() {
    if (!unidadId) return;

    setCargando(true);
    try {
      const data = await listarServiciosUnidad(Number(unidadId));
      setServicios(data);
    } catch (err) {
      console.error("Error cargando servicios:", err);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarServicios();
  }, [unidadId]);

  // ===============================
  // Crear servicio
  // ===============================
  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!unidadId) {
      alert("Selecciona una unidad");
      return;
    }

    try {
      await crearServicioUnidad({
        unidadId: Number(unidadId),
        descripcion,
        costo: Number(costo),
        fecha,
      });

      setDescripcion("");
      setCosto("");
      setFecha("");

      cargarServicios();
    } catch (err) {
      console.error("Error creando servicio:", err);
    }
  }

  return (
    <div className="mantenimiento-wrapper">
      <BotonRegresar />
      <h2>Servicios de Unidad</h2>

      {/* FORMULARIO */}
      <div className="card">
        <h3>Nuevo servicio</h3>

        <form className="form-grid" onSubmit={onSubmit}>
          <div>
            <label>Unidad</label>
            <select
              value={unidadId}
              onChange={(e) => setUnidadId(e.target.value)}
            >
              <option value="">Selecciona unidad</option>
              {unidades.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre} ({u.unidadId ?? "N/A"})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Descripción</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div>
            <label>Costo</label>
            <input
              type="number"
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
              step="0.01"
            />
          </div>

          <div>
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button className="btn-primary" type="submit">
              Guardar servicio
            </button>
          </div>
        </form>
      </div>

      {/* HISTORIAL */}
      <div className="card">
        <h3>Historial de servicios</h3>

        {cargando ? (
          <div>Cargando...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Costo</th>
              </tr>
            </thead>

            <tbody>
              {servicios.map((s) => (
                <tr key={s.id}>
                  <td>{new Date(s.fecha).toLocaleDateString()}</td>
                  <td>{s.descripcion}</td>
                  <td>${s.costo.toFixed(2)}</td>
                </tr>
              ))}

              {servicios.length === 0 && (
                <tr>
                  <td colSpan={3} className="no-data">
                    No hay servicios registrados.
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
