import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import unidadesService from "../../services/unidades.Service";

export default function MantenimientosUnidad() {
  const { id } = useParams();
  const [unidad, setUnidad] = useState(null);
  const [mantenimientos, setMantenimientos] = useState([]);
  const [form, setForm] = useState({
    tipo: "",
    descripcion: "",
    costo: "",
    fecha: "",
  });

  useEffect(() => {
    cargarUnidad();
    cargarMantenimientos();
  }, []);

  async function cargarUnidad() {
    const res = await unidadesService.obtenerUnidad(id);
    setUnidad(res);
  }

  async function cargarMantenimientos() {
    const res = await unidadesService.obtenerMantenimientos(id);
    setMantenimientos(res);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function guardar() {
    await unidadesService.crearMantenimiento(id, form);
    setForm({ tipo: "", descripcion: "", costo: "", fecha: "" });
    cargarMantenimientos();
  }

  return (
    <div className="page-wrapper">
      <h2>Mantenimientos de la unidad #{id}</h2>

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
          </tbody>
        </table>
      </div>
    </div>
  );
}
