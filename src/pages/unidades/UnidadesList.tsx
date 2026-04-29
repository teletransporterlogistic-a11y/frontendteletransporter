import { useState } from "react";
import { useUnidades } from "../../hooks/unidades/useUnidades";
import { Link } from "react-router-dom";

export default function UnidadesList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");

  const { data, isLoading } = useUnidades({
    page,
    pageSize,
    search,
    tipo,
    estado,
  });

  return (
    <div>
      <h1>Unidades</h1>

      {/* Filtros */}
      <div className="filters">
        <input
          placeholder="Buscar unidad..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={tipo}
          onChange={(e) => {
            setTipo(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Todos los tipos</option>
          <option value="CAMIONETA">Camioneta</option>
          <option value="CAMION">Camión</option>
          <option value="MOTO">Moto</option>
          <option value="TRACTO">Tracto</option>
        </select>

        <select
          value={estado}
          onChange={(e) => {
            setEstado(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Todos los estados</option>
          <option value="ACTIVA">Activa</option>
          <option value="INACTIVA">Inactiva</option>
          <option value="MANTENIMIENTO">Mantenimiento</option>
        </select>

        <Link to="/unidades/nueva" className="btn-primary">
          Nueva Unidad
        </Link>
      </div>

      {/* Tabla */}
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID Unidad</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Km acumulados</th>
              <th>Rendimiento</th>
              <th>Último servicio</th>
              <th>Próximo servicio</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data?.data.map((u) => (
              <tr key={u.id}>
                <td>{u.unidadId}</td>
                <td>{u.nombre}</td>
                <td>{u.tipo}</td>
                <td>{u.estado}</td>
                <td>{u.kmAcumulados.toLocaleString()}</td>
                <td>{u.rendimientoKmL} km/L</td>
                <td>
                  {u.ultimoServicio
                    ? new Date(u.ultimoServicio).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  {u.proximoServicio
                    ? new Date(u.proximoServicio).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  <Link to={`/unidades/editar/${u.id}`}>Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Paginación */}
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
