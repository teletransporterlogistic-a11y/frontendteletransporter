// src/pages/flota/FlotaNuevoVehiculo.tsx
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import flotaService from "@/services/flotaService";

// ===============================
// Tipos
// ===============================
interface VehiculoForm {
  tipo: string;
  marca: string;
  modelo: string;
  anio: string;
  placas: string;
  capacidadKg: string;
  volumenM3: string;
  estado: string;
}

// ===============================
// Componente
// ===============================
export default function FlotaNuevoVehiculo() {
  const navigate = useNavigate();

  const [form, setForm] = useState<VehiculoForm>({
    tipo: "",
    marca: "",
    modelo: "",
    anio: "",
    placas: "",
    capacidadKg: "",
    volumenM3: "",
    estado: "ACTIVO",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    <div className="page-wrapper">
      <h2>Nuevo vehículo</h2>

      <div className="form">
        <input
          name="tipo"
          placeholder="Tipo"
          value={form.tipo}
          onChange={handleChange}
        />

        <input
          name="marca"
          placeholder="Marca"
          value={form.marca}
          onChange={handleChange}
        />

        <input
          name="modelo"
          placeholder="Modelo"
          value={form.modelo}
          onChange={handleChange}
        />

        <input
          name="anio"
          placeholder="Año"
          type="number"
          value={form.anio}
          onChange={handleChange}
        />

        <input
          name="placas"
          placeholder="Placas"
          value={form.placas}
          onChange={handleChange}
        />

        <input
          name="capacidadKg"
          placeholder="Capacidad (kg)"
          type="number"
          value={form.capacidadKg}
          onChange={handleChange}
        />

        <input
          name="volumenM3"
          placeholder="Volumen (m³)"
          type="number"
          value={form.volumenM3}
          onChange={handleChange}
        />

        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="ACTIVO">ACTIVO</option>
          <option value="INACTIVO">INACTIVO</option>
          <option value="MANTENIMIENTO">MANTENIMIENTO</option>
        </select>

        <button className="btn-primary" onClick={guardar}>
          Guardar
        </button>
      </div>
    </div>
  );
}
