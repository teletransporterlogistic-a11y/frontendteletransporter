// src/pages/usuarios/Usuarios.tsx
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

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol?: Rol;
}

// ===============================
// Componente
// ===============================
export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // ===============================
  // Cargar usuarios
  // ===============================
  useEffect(() => {
    api.get("/usuarios").then((r) => setUsuarios(r));
  }, []);

  // ===============================
  // Eliminar usuario
  // ===============================
  const eliminar = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await api.delete(`/usuarios/${id}`);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      alert("Usuario eliminado");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar usuario");
    }
  };

  // ===============================
  // Render
  // ===============================
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuarios</h1>

        <Link to="/usuarios/nuevo" className="btn-primary">
          + Nuevo Usuario
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Nombre</th>
              <th className="p-2">Email</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="p-2">{u.nombre}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.rol?.nombre ?? "Sin rol"}</td>

                <td className="p-2 flex gap-2">
                  <Link
                    to={`/usuarios/editar/${u.id}`}
                    className="btn-secondary"
                  >
                    Editar
                  </Link>

                  <Link
                    to={`/usuarios/reset-password/${u.id}`}
                    className="btn-secondary"
                  >
                    Reset Password
                  </Link>

                  <button
                    className="btn-danger"
                    onClick={() => eliminar(u.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {usuarios.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
