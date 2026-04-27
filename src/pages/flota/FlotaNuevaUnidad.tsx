// src/pages/flota/FlotaNuevaUnidad.tsx
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import unidadesService from "@/services/unidadesService";

// ===============================
// Tipos
// ===============================
interface UnidadForm {
  nombre: string;
  tipo: string;
  estado: string;
  ultimoServicio: string;
  proximoServicio: string;
}

// ===============================
// Componente
// ===============================
export default function FlotaNuevaUnidad() {
  const navigate = useNavigate();

  const [form, setForm] = useState<UnidadForm>({
    nombre: "",
    tipo: "",
    estado: "ACTIVA",
    ultimoServicio: "",
    proximoServicio: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function guardar() {
    try {
      await unidadesService.crearUnidad(form);
      navigate("/flota/unidades");
    } catch (err) {
      console.error("Error creando unidad:", err);
    }
  }

  return (
    <div className="page-wrapper">
      <h2>Nueva unidad</h2>

      <div className="form">
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

        <label>Último servicio</label>
        <input
          type="date"
          name="ultimoServicio"
          value={form.ultimoServicio}
          onChange={handleChange}
        />

        <label>Próximo servicio</label>
        <input
          type="date"
          name="proximoServicio"
          value={form.proximoServicio}
          onChange={handleChange}
        />

        <button className="btn-primary" onClick={guardar}>
          Guardar
        </button>
      </div>
    </div>
  );
}
