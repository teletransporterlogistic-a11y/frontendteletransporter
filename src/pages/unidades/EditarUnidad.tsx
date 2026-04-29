import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import unidadesService from "../../services/unidades.service";

export default function EditarUnidad() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  useEffect(() => {
    cargarUnidad();
  }, []);

  async function cargarUnidad() {
    try {
      const data = await unidadesService.obtenerUnidades();
      const unidad = data.data.find((u) => u.id === Number(id));
      setForm(unidad);
    } catch (error) {
      console.error("Error cargando unidad:", error);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function guardar() {
    try {
      const payload = {
        ...form,
        kmAcumulados: Number(form.kmAcumulados),
        rendimientoKmL: Number(form.rendimientoKmL),
      };

      await unidadesService.actualizarUnidad(id, payload);
      navigate("/flota/unidades");
    } catch (error) {
      console.error("Error actualizando unidad:", error);
    }
  }

  if (!form) return <p>Cargando...</p>;

  return (
    <div className="page-container">
      <h2>Editar Unidad</h2>

      <div className="form-grid">
        <input
          name="unidadId"
          placeholder="ID de unidad"
          value={form.unidadId}
          onChange={handleChange}
        />

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          name="tipo"
          placeholder="Tipo"
          value={form.tipo}
          onChange={handleChange}
        />

        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="ACTIVO">ACTIVO</option>
          <option value="INACTIVO">INACTIVO</option>
          <option value="MANTENIMIENTO">MANTENIMIENTO</option>
        </select>

        <input
          name="kmAcumulados"
          type="number"
          placeholder="KM acumulados"
          value={form.kmAcumulados}
          onChange={handleChange}
        />

        <input
          name="rendimientoKmL"
          type="number"
          placeholder="Rendimiento (km/L)"
          value={form.rendimientoKmL}
          onChange={handleChange}
        />
      </div>

      <button className="btn-primary" onClick={guardar}>
        Guardar cambios
      </button>
    </div>
  );
}
