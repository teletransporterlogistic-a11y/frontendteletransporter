// src/pages/flota/FlotaMantenimiento.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import flotaService from "@/services/flotaService";

// ===============================
// Tipos
// ===============================
interface MantenimientoFlota {
  id: number;
  unidad: string;
  fecha: string;
  tipo: string;
  costo: number;
}

// ===============================
// Componente
// ===============================
export default function FlotaMantenimiento() {
  const { id } = useParams<{ id: string }>(); // ID de la unidad

  const [mantenimientos, setMantenimientos] = useState<MantenimientoFlota[]>([]);

  useEffect(() => {
    if (id) cargar();
  }, [id]);

  async function cargar() {
    try {
      const data = await flotaService.obtenerMantenimientos(id!);
      setMantenimientos(data);
    } catch (error) {
      console.error("Error cargando mantenimientos:", error);
    }
  }

  return (
    <div className="page-wrapper">
      <h2>Mantenimiento de la unidad #{id}</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Unidad</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Costo</th>
          </tr>
        </thead>

        <tbody>
          {mantenimientos.map((m) => (
            <tr key={m.id}>
              <td>{m.unidad}</td>
              <td>{new Date(m.fecha).toLocaleDateString()}</td>
              <td>{m.tipo}</td>
              <td>${m.costo.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
