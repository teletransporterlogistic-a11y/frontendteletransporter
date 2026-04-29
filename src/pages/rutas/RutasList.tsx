import { useState } from "react";
import { useRutas } from "../../hooks/rutas/useRutas";
import { Link } from "react-router-dom";

export default function RutasList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [activa, setActiva] = useState<boolean | undefined>(undefined);

  const { data, isLoading } = useRutas({
    page,
    pageSize,
    search,
    activa,
  });

  return (
    <div>
      <h1>Rutas</h1>

      <div className="filters">
        <input
          placeholder="Buscar ruta..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={activa === undefined ? "" : activa ? "true" : "false"}
          onChange={(e) => {
            const val = e.target.value;
            setActiva(val === "" ? undefined : val === "true");
            setPage(1);
          }}
        >
          <option value="">Todas</option>
          <option value="true">Activas</option>
          <option value="false">Inactivas</option>
        </select>

        <Link to="/rutas/nueva" className="btn-primary">
          Nueva Ruta
        </Link>
      </div>

      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Operador</th>
              <th>Unidad</th>
              <th>Activa</th>
              <th>Envíos</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data?.data.map((r) => (
              <tr key={r.id}>
                <td>{r.codigo}</td>
                <td>{r.nombre}</td>
                <td>{r.operador?.nombre ?? "—"}</td>
                <td>{r.unidad?.nombre ?? "—"}</td>
                <td>{r.activa ? "Sí" : "No"}</td>
                <td>{r.envios?.length ?? 0}</td>
                <td>
                  <Link to={`/rutas/editar/${r.id}`}>Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {data && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Anterior
          </button>

          <span>
            Página {data.meta.page} de {data.meta.totalPages}
          </span>

          <button
            disabled={page === data.meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
