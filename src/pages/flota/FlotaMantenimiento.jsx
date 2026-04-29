import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import flotaService from "../../services/flotaService";

export default function FlotaMantenimiento() {
  const { id } = useParams(); // <-- ID de la unidad
  const [mantenimientos, setMantenimientos] = useState([]);

  useEffect(() => {
    if (id) cargar();
  }, [id]);

  async function cargar() {
    try {
      const data = await flotaService.obtenerMantenimientos(id);
      setMantenimientos(data);
    } catch (error) {
      console.error("Error cargando mantenimientos:", error);
    }
  }

  return (
    <div>
      <h2>Mantenimiento de la unidad #{id}</h2>

      <table>
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
              <td>{m.fecha}</td>
              <td>{m.tipo}</td>
              <td>${m.costo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
