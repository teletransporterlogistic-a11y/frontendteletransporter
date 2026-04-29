import { useState } from "react";
import { useNavigate } from "react-router-dom";
import flotaService from "../../services/flotaService";

export default function FlotaNuevoVehiculo() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tipo: "",
    marca: "",
    modelo: "",
    anio: "",
    placas: "",
    capacidadKg: "",
    volumenM3: "",
    estado: "ACTIVO", // valor por defecto recomendado
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function guardar() {
    try {
      const payload = {
        tipo: form.tipo,
        marca: form.marca || null,
        modelo: form.modelo || null,
        anio: form.anio ? Number(form.anio) : null,
        placas: form.placas,
        capacidadKg: Number(form.capacidadKg),
        volumenM3: Number(form.volumenM3),
        estado: form.estado,
      };

      await flotaService.crearVehiculo(payload);
      navigate("/flota/vehiculos");
    } catch (error) {
      console.error("Error creando vehículo:", error);
    }
  }

  return (
    <div>
      <h2>Nuevo vehículo</h2>

      <input name="tipo" placeholder="Tipo" onChange={handleChange} />
      <input name="marca" placeholder="Marca" onChange={handleChange} />
      <input name="modelo" placeholder="Modelo" onChange={handleChange} />
      <input name="anio" placeholder="Año" type="number" onChange={handleChange} />
      <input name="placas" placeholder="Placas" onChange={handleChange} />

      <input
        name="capacidadKg"
        placeholder="Capacidad (kg)"
        type="number"
        onChange={handleChange}
      />

      <input
        name="volumenM3"
        placeholder="Volumen (m³)"
        type="number"
        onChange={handleChange}
      />

      <select name="estado" onChange={handleChange}>
        <option value="ACTIVO">ACTIVO</option>
        <option value="INACTIVO">INACTIVO</option>
        <option value="MANTENIMIENTO">MANTENIMIENTO</option>
      </select>

      <button onClick={guardar}>Guardar</button>
    </div>
  );
}
