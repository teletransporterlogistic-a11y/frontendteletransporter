// src/pages/mantenimiento/CombustiblePage.tsx
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
  crearCargaCombustible,
  listarCargasCombustible,
} from "@/services/combustible.service";
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

interface CargaCombustible {
  id: number;
  fecha: string;
  tipoCombustible: string;
  litros: number;
  costoTotal: number;
  km: number;
  rendimiento?: number | null;
}

// ===============================
// Componente
// ===============================
export default function CombustiblePage() {
  const [unidades, setUnidades] = useState<Unidad[]>([]);
  const [unidadId, setUnidadId] = useState<string>("");

  const [tipoCombustible, setTipoCombustible] = useState<string>("Magna");
  const [litros, setLitros] = useState<string>("");
  const [costoTotal, setCostoTotal] = useState<string>("");
  const [km, setKm] = useState<string>("");

  const [cargas, setCargas] = useState<CargaCombustible[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);

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
  // Cargar cargas de combustible
  // ===============================
  async function cargarCargas() {
    if (!unidadId) return;

    setCargando(true);
    try {
      const data = await listarCargasCombustible(Number(unidadId));
      setCargas(data);
    } catch (err) {
      console.error("Error cargando cargas:", err);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarCargas();
  }, [unidadId]);

  // ===============================
  // Crear carga
  // ===============================
  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!unidadId) {
      alert("Selecciona una unidad");
      return;
    }

    try {
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
    } catch (err) {
      console.error("Error creando carga:", err);
    }
  }

  return (
    <div className="mantenimiento-wrapper">
      <BotonRegresar />
      <h2>Cargas de combustible</h2>

      {/* FORMULARIO */}
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
                  {u.nombre} ({u.unidadId ?? "N/A"})
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

      {/* HISTORIAL */}
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
                  <td>${c.costoTotal.toFixed(2)}</td>
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
