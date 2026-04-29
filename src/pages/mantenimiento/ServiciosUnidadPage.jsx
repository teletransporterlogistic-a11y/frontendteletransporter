// src/pages/mantenimiento/ServiciosUnidadPage.jsx
import { useEffect, useState } from "react";
import {
  crearServicioUnidad,
  listarServiciosUnidad,
} from "../../services/servicios-unidad.service";
import api from "../../api/api.js";
import BotonRegresar from "../../components/BotonRegresar";
import "./Mantenimiento.css";

export default function ServiciosUnidadPage() {
  const [unidades, setUnidades] = useState([]);
  const [unidadId, setUnidadId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [costo, setCosto] = useState("");
  const [fecha, setFecha] = useState("");
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Cargar unidades
  useEffect(() => {
    async function cargarUnidades() {
      const unidades = await api.get("/unidades");
      setUnidades(unidades);
    }
    cargarUnidades();
  }, []);

  // Cargar servicios de la unidad seleccionada
  async function cargarServicios() {
    if (!unidadId) return;
    setCargando(true);
    try {
      const data = await listarServiciosUnidad(unidadId);
      setServicios(data);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarServicios();
  }, [unidadId]);

  // Crear servicio
  async function onSubmit(e) {
    e.preventDefault();

    if (!unidadId) {
      alert("Selecciona una unidad");
      return;
    }

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
  }

  return (
    <div className="mantenimiento-wrapper">
      <BotonRegresar />
      <h2>Servicios de Unidad</h2>

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
                  {u.nombre} ({u.unidadId})
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
                  <td>${s.costo}</td>
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
