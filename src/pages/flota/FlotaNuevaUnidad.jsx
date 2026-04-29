import { useState } from "react";
import { useNavigate } from "react-router-dom";
import unidadesService from "../../services/unidadesService";

export default function FlotaNuevaUnidad() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    estado: "ACTIVA",
    ultimoServicio: "",
    proximoServicio: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function guardar() {
    await unidadesService.crearUnidad(form);
    navigate("/flota/unidades");
  }

  return (
    <div className="page-wrapper">
      <h2>Nueva unidad</h2>

      <div className="form">
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="tipo" placeholder="Tipo" onChange={handleChange} />

        <label>Último servicio</label>
        <input type="date" name="ultimoServicio" onChange={handleChange} />

        <label>Próximo servicio</label>
        <input type="date" name="proximoServicio" onChange={handleChange} />

        <button className="btn-primary" onClick={guardar}>
          Guardar
        </button>
      </div>
    </div>
  );
}
