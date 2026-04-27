// src/pages/flota/FlotaMantenimientoUnidad.tsx
import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import unidadesService from "@/services/unidadesService";

// ===============================
// Tipos
// ===============================
interface Mantenimiento {
  id: number;
  tipo: string;
  descripcion?: string | null;
  costo: number;
  fecha: string;
}

interface MantenimientoForm {
  tipo: string;
  descripcion: string;
  costo: string;
  fecha: string;
}

// ===============================
// Componente
// ===============================
export default function FlotaMantenimientoUnidad() {
  const { id } = useParams<{ id: string }>();

  const [mantenimientos, setMantenimientos] = useState<Mantenimiento[]>([]);
  const [form, setForm] = useState<MantenimientoForm>({
    tipo: "",
    descripcion: "",
    costo: "",
    fecha: "",
  });

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    if (!id) return;

    try {
      const res = await unidadesService.obtenerMantenimientos(id);
      setMantenimientos(res);
    } catch (err) {
      console.error("Error cargando mantenimientos:", err);
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function guardar() {
    if (!id) return;

    try {
      const payload = {
        tipo: form.tipo,
        descripcion: form.descripcion || null,
        costo: Number(form.costo),
        fecha: form.fecha,
      };

      await unidadesService.crearMantenimiento(id, payload);
      setForm({ tipo: "", descripcion: "", costo: "", fecha: "" });
      cargar();
    } catch (err) {
      console.error("Error guardando mantenimiento:", err);
    }
  }

  return (
    <div className="page-wrapper">
      <h2>Mantenimientos de la unidad #{id}</h2>

      {/* FORMULARIO */}
      <div className="card">
        <h3>Nuevo mantenimiento</h3>

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
          type="number"
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

      {/* HISTORIAL */}
      <div className="card">
        <h3>Historial de mantenimientos</h3>

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
          </tbody>
        </table>
      </div>
    </div>
  );
}
