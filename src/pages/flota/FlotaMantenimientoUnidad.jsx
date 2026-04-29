import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import unidadesService from "../../services/unidadesService";

export default function FlotaMantenimientoUnidad() {
  const { id } = useParams();
  const [mantenimientos, setMantenimientos] = useState([]);
  const [form, setForm] = useState({
    tipo: "",
    descripcion: "",
    costo: "",
    fecha: "",
  });

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    const res = await unidadesService.obtenerMantenimientos(id);
    setMantenimientos(res);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function guardar() {
    await unidadesService.crearMantenimiento(id, form);
    cargar();
  }

  return (
    <div className="page-wrapper">
      <h2>Mantenimientos de la unidad #{id}</h2>

      <div className="card">
        <h3>Nuevo mantenimiento</h3>

        <input name="tipo" placeholder="Tipo" onChange={handleChange} />
        <input name="descripcion" placeholder="Descripción" onChange={handleChange} />
        <input name="costo" placeholder="Costo" onChange={handleChange} />
        <input type="date" name="fecha" onChange={handleChange} />

        <button className="btn-primary" onClick={guardar}>
          Guardar mantenimiento
        </button>
      </div>

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
