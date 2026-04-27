// src/pages/roles/EditarRol.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/api";

// ===============================
// Tipos
// ===============================
interface Permiso {
  id: number;
  accion: string;
}

interface Rol {
  id: number;
  nombre: string;
  Permiso?: Permiso[];
}

interface RouteParams {
  id?: string;
}

// ===============================
// Componente
// ===============================
export default function EditarRol() {
  const { id } = useParams<RouteParams>();

  const [rol, setRol] = useState<Rol | null>(null);
  const [permisos, setPermisos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accionesDisponibles: string[] = [
    "envios.ver",
    "envios.crear",
    "envios.editar",
    "envios.eliminar",
    "clientes.ver",
    "clientes.crear",
    "clientes.editar",
    "operadores.asignar",
    "operadores.editar",
    "operadores.modificar",
    "rastreo.ver"
  ];

  // ===============================
  // Cargar rol
  // ===============================
  useEffect(() => {
    async function cargarRol() {
      if (!id) return;

      try {
        const res = await api.get(`/roles/${id}`);
        const data: Rol = res;

        setRol(data);
        setPermisos(data.Permiso?.map((p) => p.accion) ?? []);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el rol");
      } finally {
        setLoading(false);
      }
    }

    cargarRol();
  }, [id]);

  // ===============================
  // Handlers
  // ===============================
  const toggle = (accion: string) => {
    setPermisos((prev) =>
      prev.includes(accion)
        ? prev.filter((p) => p !== accion)
        : [...prev, accion]
    );
  };

  const guardar = async () => {
    if (!id) return;

    try {
      await api.post(`/roles/${id}/permisos`, { acciones: permisos });
      alert("Permisos actualizados correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al guardar permisos");
    }
  };

  // ===============================
  // Render
  // ===============================
  if (loading) return <div className="loading">Cargando rol...</div>;
  if (error) return <div className="error-msg">{error}</div>;
  if (!rol) return <div className="error-msg">Rol no encontrado</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Editar Rol: {rol.nombre}</h1>

      <div className="bg-white p-6 shadow rounded-lg">
        {accionesDisponibles.map((accion) => (
          <label key={accion} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={permisos.includes(accion)}
              onChange={() => toggle(accion)}
            />
            {accion}
          </label>
        ))}

        <button className="btn-primary mt-4" onClick={guardar}>
          Guardar
        </button>
      </div>
    </div>
  );
}
