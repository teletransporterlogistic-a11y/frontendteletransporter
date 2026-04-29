import { useEffect, useState } from "react";
import api from "../../api/api.js";
import { Link } from "react-router-dom";

export default function ReexpedicionesPage() {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("");
  const [page, setPage] = useState(1);

  const cargar = async () => {
    setLoading(true);
    try {
      const res = await api.get("/incidencias", {
        params: {
          page,
          tipo: "REEXPEDICION",
          search,
          estado,
        },
      });

      setData(res.data.data);
      setMeta(res.data.meta);
    } catch (err) {
      console.error(err);
      alert("Error al cargar reexpediciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, [page]);

  const buscar = () => {
    setPage(1);
    cargar();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reexpediciones</h1>

      {/* FILTROS */}
      <div className="bg-white shadow p-4 rounded mb-4 flex gap-4 items-end">
        <div>
          <label>Buscar</label>
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Guía, operador, descripción..."
          />
        </div>

        <div>
          <label>Estado</label>
          <select className="input" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Todos</option>
            <option value="ABIERTA">Abierta</option>
            <option value="EN_PROCESO">En proceso</option>
            <option value="CERRADA">Cerrada</option>
          </select>
        </div>

        <button className="btn-primary" onClick={buscar}>
          Buscar
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white shadow rounded p-4">
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">ID</th>
                <th className="p-2">Guía</th>
                <th className="p-2">Descripción</th>
                <th className="p-2">Operador</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Fecha</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {data.map((i) => (
                <tr key={i.id}>
                  <td className="p-2">{i.id}</td>
                  <td className="p-2">{i.envio?.guia}</td>
                  <td className="p-2">{i.descripcion}</td>
                  <td className="p-2">{i.operador?.nombre}</td>
                  <td className="p-2">{i.estado}</td>
                  <td className="p-2">{new Date(i.createdAt).toLocaleString()}</td>

                  <td className="p-2">
                    <Link to={`/incidencias/editar/${i.id}`} className="btn-secondary">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No hay reexpediciones registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* PAGINACIÓN */}
        <div className="flex justify-between mt-4">
          <button
            disabled={page <= 1}
            className="btn-secondary"
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>

          <span>
            Página {meta.page} de {meta.totalPages}
          </span>

          <button
            disabled={page >= meta.totalPages}
            className="btn-secondary"
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
