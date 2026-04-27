// src/pages/flota/FlotaUnidades.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import unidadesService from "@/services/unidadesService";

// ===============================
// Tipos
// ===============================
interface Unidad {
  id: number;
  nombre: string;
  tipo: string;
  estado: string;

  ultimoServicio?: string | null;
  proximoServicio?: string | null;

  kmAcumulados?: number;
  rendimientoKmL?: number;

  actualizadoEn?: string;
}

// ===============================
// Componente
// ===============================
export default function FlotaUnidades() {
  const [unidades, setUnidades] = useState<Unidad[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    try {
      const res = await unidadesService.obtenerUnidades();
      setUnidades(res.data);
    } catch (error) {
      console.error("Error cargando unidades:", error);
    }
  }

  return (
    <div className="page-wrapper">
      <h2>Unidades</h2>

      <button
        className="btn-primary"
        onClick={() => navigate("/flota/unidades/nueva")}
      >
        Nueva unidad
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Unidad</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Último servicio</th>
            <th>Próximo servicio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {unidades.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.tipo}</td>
              <td>{u.estado}</td>

              <td>
                {u.ultimoServicio
                  ? new Date(u.ultimoServicio).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                {u.proximoServicio
                  ? new Date(u.proximoServicio).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <button
                  className="btn-small"
                  onClick={() =>
                    navigate(`/flota/unidades/${u.id}/mantenimientos`)
                  }
                >
                  Mantenimientos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
