import { useState } from "react";
import { useNavigate } from "react-router-dom";
import unidadesService from "../../services/unidades.service";

export default function NuevaUnidad() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    unidadId: "",
    nombre: "",
    tipo: "",
    estado: "ACTIVO",
    kmAcumulados: 0,
    rendimientoKmL: 0,
  });

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

      await unidadesService.crearUnidad(payload);
      navigate("/flota/unidades");
    } catch (error) {
      console.error("Error creando unidad:", error);
    }
  }

  return (
    <div className="page-container">
      <h2>Nueva Unidad</h2>

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
        Guardar
      </button>
    </div>
  );
}
