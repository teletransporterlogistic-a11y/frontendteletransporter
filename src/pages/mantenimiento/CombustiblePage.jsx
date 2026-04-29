import { useEffect, useState } from "react";
import {
  crearCargaCombustible,
  listarCargasCombustible,
} from "../../services/combustible.service";
import api from "../../api/api";
import BotonRegresar from "../../components/BotonRegresar";
import "./Mantenimiento.css";

export default function CombustiblePage() {
  const [unidades, setUnidades] = useState([]);
  const [unidadId, setUnidadId] = useState("");
  const [tipoCombustible, setTipoCombustible] = useState("Magna");
  const [litros, setLitros] = useState("");
  const [costoTotal, setCostoTotal] = useState("");
  const [km, setKm] = useState("");
  const [cargas, setCargas] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    async function cargarUnidades() {
      const unidades = await api.get("/unidades");
      setUnidades(unidades);
    }
    cargarUnidades();
  }, []);

  async function cargarCargas() {
    if (!unidadId) return;
    setCargando(true);
    try {
      const cargas = await listarCargasCombustible(unidadId);
      setCargas(cargas);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarCargas();
  }, [unidadId]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!unidadId) {
      alert("Selecciona una unidad");
      return;
    }

    await crearCargaCombustible({
      unidadId: Number(unidadId),
      tipoCombustible,
      litros: Number(litros),
      costoTotal: Number(costoTotal),
      km: Number(km),
    });

    setLitros("");
    setCostoTotal("");
    setKm("");
    cargarCargas();
  }

  return (
    <div className="mantenimiento-wrapper">
      <BotonRegresar />
      <h2>Cargas de combustible</h2>

      <div className="card">
        <h3>Nueva carga</h3>
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
            <label>Tipo de combustible</label>
            <select
              value={tipoCombustible}
              onChange={(e) => setTipoCombustible(e.target.value)}
            >
              <option value="Magna">Magna</option>
              <option value="Premium">Premium</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>

          <div>
            <label>Litros</label>
            <input
              type="number"
              value={litros}
              onChange={(e) => setLitros(e.target.value)}
              step="0.01"
            />
          </div>

          <div>
            <label>Costo total</label>
            <input
              type="number"
              value={costoTotal}
              onChange={(e) => setCostoTotal(e.target.value)}
              step="0.01"
            />
          </div>

          <div>
            <label>Kilómetros (odómetro)</label>
            <input
              type="number"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              step="1"
            />
          </div>

          <div className="form-actions">
            <button className="btn-primary" type="submit">
              Guardar carga
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Historial de cargas</h3>
        {cargando ? (
          <div>Cargando...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Litros</th>
                <th>Costo</th>
                <th>Km</th>
                <th>Rendimiento (km/l)</th>
              </tr>
            </thead>
            <tbody>
              {cargas.map((c) => (
                <tr key={c.id}>
                  <td>{new Date(c.fecha).toLocaleString()}</td>
                  <td>{c.tipoCombustible}</td>
                  <td>{c.litros}</td>
                  <td>${c.costoTotal}</td>
                  <td>{c.km}</td>
                  <td>{c.rendimiento ? c.rendimiento.toFixed(2) : "-"}</td>
                </tr>
              ))}
              {cargas.length === 0 && (
                <tr>
                  <td colSpan={6} className="no-data">
                    No hay cargas registradas.
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
