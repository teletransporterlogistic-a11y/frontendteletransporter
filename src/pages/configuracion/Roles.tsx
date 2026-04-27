// src/pages/roles/Roles.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/api/api";

// ===============================
// Tipos
// ===============================
interface Rol {
  id: number;
  nombre: string;
}

// ===============================
// Componente
// ===============================
export default function Roles() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ===============================
  // Cargar roles
  // ===============================
  useEffect(() => {
    async function cargarRoles() {
      try {
        const res = await api.get("/roles");
        setRoles(res ?? []);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los roles");
      } finally {
        setLoading(false);
      }
    }

    cargarRoles();
  }, []);

  // ===============================
  // Render
  // ===============================
  if (loading) {
    return <div className="loading">Cargando roles...</div>;
  }

  if (error) {
    return <div className="error-msg">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Roles</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Nombre</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((r) => (
            <tr key={r.id}>
              <td className="p-2">{r.nombre}</td>
              <td className="p-2">
                <Link
                  to={`/configuracion/roles/${r.id}`}
                  className="btn-primary"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}

          {roles.length === 0 && (
            <tr>
              <td colSpan={2} className="p-4 text-center text-gray-500">
                No hay roles registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
