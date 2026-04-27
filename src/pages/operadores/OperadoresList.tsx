import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

interface Rol {
  id: number;
  nombre: string;
}

interface Operador {
  id: number;
  nombre: string;
  usuario: string;
  activo: boolean;
  rolId?: number | null;
  telefonoWhatsApp?: string | null;
  telefonoSMS?: string | null;
  notiWhatsApp: boolean;
  notiSMS: boolean;
  notiPush: boolean;
  rol?: Rol | null;
}

export default function OperadoresList() {
  const [operadores, setOperadores] = useState<Operador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    setLoading(true);
    setError(null);
    try {
      // Si tu backend soporta filtros, aquí podrías mandar ?search=
      const res = await api.get("/operadores", {
        params: search ? { search } : {},
      });
      setOperadores(res.data?.data || res.data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los operadores");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este operador?")) return;
    try {
      await api.delete(`/operadores/${id}`);
      setOperadores((prev) => prev.filter((o) => o.id !== id));
      alert("Operador eliminado");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar operador");
    }
  };

  const toggleActivo = async (op: Operador) => {
    try {
      const res = await api.put(`/operadores/${op.id}`, {
        ...op,
        activo: !op.activo,
      });
      setOperadores((prev) =>
        prev.map((o) => (o.id === op.id ? res.data : o))
      );
    } catch (err) {
      console.error(err);
      alert("Error al cambiar estado del operador");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Operadores</h1>

        <div className="flex gap-2">
          <input
            className="input"
            placeholder="Buscar por nombre o usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn-secondary" onClick={cargar}>
            Buscar
          </button>

          <Link to="/operadores/nuevo" className="btn-primary">
            + Nuevo Operador
          </Link>
        </div>
      </div>

      {loading && <div className="loading">Cargando operadores...</div>}
      {error && <div className="error-msg">{error}</div>}

      {!loading && !error && (
        <div className="bg-white shadow rounded-lg p-4">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">ID</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Usuario</th>
                <th className="p-2">Rol</th>
                <th className="p-2">WhatsApp</th>
                <th className="p-2">SMS</th>
                <th className="p-2">Activo</th>
                <th className="p-2">Notificaciones</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {operadores.map((o) => (
                <tr key={o.id}>
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{o.nombre}</td>
                  <td className="p-2">{o.usuario}</td>
                  <td className="p-2">{o.rol?.nombre || "Sin rol"}</td>
                  <td className="p-2">{o.telefonoWhatsApp || "-"}</td>
                  <td className="p-2">{o.telefonoSMS || "-"}</td>
                  <td className="p-2">
                    <button
                      className={`px-2 py-1 rounded text-xs ${
                        o.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                      onClick={() => toggleActivo(o)}
                    >
                      {o.activo ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="p-2 text-xs">
                    WA: {o.notiWhatsApp ? "✔" : "✖"} <br />
                    SMS: {o.notiSMS ? "✔" : "✖"} <br />
                    Push: {o.notiPush ? "✔" : "✖"}
                  </td>
                  <td className="p-2 flex gap-2">
                    <Link
                      to={`/operadores/editar/${o.id}`}
                      className="btn-secondary"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn-danger"
                      onClick={() => eliminar(o.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {operadores.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-gray-500">
                    No hay operadores registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
