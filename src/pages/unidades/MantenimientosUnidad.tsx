// src/pages/flota/MantenimientosUnidad.tsx
import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import unidadesService from "@/services/unidades.service";

// ===============================
// Tipos
// ===============================
interface Unidad {
  id: number;
  nombre: string;
  tipo: string;
  estado: string;
}

interface MantenimientoUnidad {
  id: number;
  tipo: string;
  descripcion: string | null;
  costo: number | null;
  fecha: string;
}

interface FormMantenimiento {
  tipo: string;
  descripcion: string;
  costo: string;
  fecha: string;
}

// ===============================
// Componente
// ===============================
export default function MantenimientosUnidad() {
  const { id } = useParams();
  const unidadId = Number(id);

  const [unidad, setUnidad] = useState<Unidad | null>(null);
  const [mantenimientos, setMantenimientos] = useState<MantenimientoUnidad[]>([]);
  const [form, setForm] = useState<FormMantenimiento>({
    tipo: "",
    descripcion: "",
    costo: "",
    fecha: "",
  });

  useEffect(() => {
    if (!unidadId) return;
    cargarUnidad();
    cargarMantenimientos();
  }, [unidadId]);

  async function cargarUnidad() {
    try {
      const res = await unidadesService.obtenerUnidad(unidadId);
      setUnidad(res);
    } catch (err) {
      console.error("Error cargando unidad:", err);
    }
  }

  async function cargarMantenimientos() {
    try {
      const res = await unidadesService.obtenerMantenimientos(unidadId);
      setMantenimientos(res);
    } catch (err) {
      console.error("Error cargando mantenimientos:", err);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function guardar() {
    try {
      await unidadesService.crearMantenimiento(unidadId, {
        tipo: form.tipo,
        descripcion: form.descripcion,
        costo: Number(form.costo),
        fecha: form.fecha,
      });

      setForm({ tipo: "", descripcion: "", costo: "", fecha: "" });
      cargarMantenimientos();
    } catch (err) {
      console.error("Error guardando mantenimiento:", err);
    }
  }

  return (
    <div className="page-wrapper">
      <h2>Mantenimientos de la unidad #{unidadId}</h2>

      {unidad && (
        <div className="card">
          <p><strong>Unidad:</strong> {unidad.nombre}</p>
          <p><strong>Tipo:</strong> {unidad.tipo}</p>
          <p><strong>Estado:</strong> {unidad.estado}</p>
        </div>
      )}

      <div className="card">
        <h3>Registrar mantenimiento</h3>

        <input
          name="tipo"
          placeholder="Tipo"
          value={form.tipo}
          onChange={handleChange}
        />

        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <input
          name="costo"
          placeholder="Costo"
          value={form.costo}
          onChange={handleChange}
        />

        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
        />

        <button className="btn-primary" onClick={guardar}>
          Guardar mantenimiento
        </button>
      </div>

      <div className="card">
        <h3>Historial</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Costo</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>
            {mantenimientos.map((m) => (
              <tr key={m.id}>
                <td>{m.tipo}</td>
                <td>{m.descripcion || "-"}</td>
                <td>{m.costo ? `$${m.costo}` : "-"}</td>
                <td>{new Date(m.fecha).toLocaleDateString()}</td>
              </tr>
            ))}

            {mantenimientos.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                  No hay mantenimientos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
