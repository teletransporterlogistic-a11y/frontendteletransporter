import { useState } from "react";
import { useUsuarios } from "../../hooks/usuarios/useUsuarios";
import { Link } from "react-router-dom";

export default function UsuariosList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [rolId, setRolId] = useState<number | undefined>(undefined);

  const { data, isLoading } = useUsuarios({
    page,
    pageSize,
    search,
    rolId,
  });

  return (
    <div>
      <h1>Usuarios</h1>

      <div className="filters">
        <input
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={rolId ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            setRolId(val ? Number(val) : undefined);
            setPage(1);
          }}
        >
          <option value="">Todos los roles</option>
          <option value="1">Administrador</option>
          <option value="2">Operador</option>
          <option value="3">Supervisor</option>
        </select>

        <Link to="/usuarios/nuevo" className="btn-primary">
          Nuevo Usuario
        </Link>
      </div>

      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data?.data.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol?.nombre ?? "—"}</td>
                <td>
                  <Link to={`/usuarios/editar/${u.id}`}>Editar</Link>
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
