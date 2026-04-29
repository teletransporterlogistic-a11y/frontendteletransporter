import { useState } from "react";
import api from "../../api/api.js";
import { useNavigate } from "react-router-dom";

export default function NuevaIncidencia() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    envioId: "",
    operadorId: "",
    usuarioId: "",
    tipo: "",
    descripcion: "",
  });

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = async () => {
    try {
      await api.post("/incidencias", form);
      alert("Incidencia creada");
      nav("/incidencias");
    } catch (err) {
      console.error(err);
      alert("Error al crear incidencia");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nueva incidencia</h1>

      <div className="bg-white shadow p-4 rounded flex flex-col gap-4">

        <input className="input" name="envioId" placeholder="ID del envío" onChange={cambiar} />
        <input className="input" name="operadorId" placeholder="ID del operador" onChange={cambiar} />
        <input className="input" name="usuarioId" placeholder="ID del usuario" onChange={cambiar} />

        <select className="input" name="tipo" onChange={cambiar}>
          <option value="">Seleccione tipo</option>
          <option value="DANO">Daño</option>
          <option value="REEXPEDICION">Reexpedición</option>
          <option value="SALIDA">Salida</option>
        </select>

        <textarea
          className="input"
          name="descripcion"
          placeholder="Descripción"
          onChange={cambiar}
        />

        <button className="btn-primary" onClick={guardar}>
          Guardar
        </button>
      </div>
    </div>
  );
}
