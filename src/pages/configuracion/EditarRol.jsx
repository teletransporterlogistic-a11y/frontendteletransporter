import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api.js";

export default function EditarRol() {
  const { id } = useParams();

  const [rol, setRol] = useState(null);
  const [permisos, setPermisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accionesDisponibles = [
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
    "rastreo.ver",
  ];

  // ============================
  // CARGA DE DATOS
  // ============================
  useEffect(() => {
    async function cargarRol() {
      try {
        const res = await api.get(`/roles/${id}`);
        const data = res.data;

        setRol(data);
        setPermisos(data.Permiso?.map((p) => p.accion) || []);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el rol");
      } finally {
        setLoading(false);
      }
    }

    cargarRol();
  }, [id]);

  // ============================
  // HANDLERS
  // ============================
  const toggle = (accion) => {
    setPermisos((prev) =>
      prev.includes(accion)
        ? prev.filter((p) => p !== accion)
        : [...prev, accion]
    );
  };

  const guardar = async () => {
    try {
      await api.post(`/roles/${id}/permisos`, { acciones: permisos });
      alert("Permisos actualizados correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al guardar permisos");
    }
  };

  // ============================
  // UI
  // ============================
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