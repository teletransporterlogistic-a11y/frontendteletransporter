// src/pages/flota/UnidadesList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import unidadesService from "@/services/unidades.service";

// ===============================
// Tipos
// ===============================
interface Unidad {
  id: number;
  unidadId: string;
  nombre: string;
  tipo: string;
  estado: string;
  kmAcumulados: number;
  rendimientoKmL: number;
}

// ===============================
// Componente
// ===============================
export default function UnidadesList() {
  const [unidades, setUnidades] = useState<Unidad[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarUnidades();
  }, []);

  async function cargarUnidades() {
    try {
      const res = await unidadesService.obtenerUnidades();

      // Si tu servicio devuelve { data: [...] }
      const lista = Array.isArray(res.data) ? res.data : [];

      setUnidades(lista);
    } catch (error) {
      console.error("Error cargando unidades:", error);
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Unidades</h2>

        <button
          className="btn-primary"
          onClick={() => navigate("/flota/unidades/nueva")}
        >
          Nueva Unidad
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Unidad ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>KM Acumulados</th>
              <th>Rendimiento (km/L)</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {unidades.map((u) => (
              <tr key={u.id}>
                <td>{u.unidadId}</td>
                <td>{u.nombre}</td>
                <td>{u.tipo}</td>
                <td>{u.estado}</td>
                <td>{u.kmAcumulados}</td>
                <td>{u.rendimientoKmL}</td>

                <td>
                  <button
                    className="btn-secondary"
                    onClick={() => navigate(`/flota/unidades/editar/${u.id}`)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}

            {unidades.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                  No hay unidades registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
