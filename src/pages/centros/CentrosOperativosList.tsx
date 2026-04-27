import { useState } from "react";
import { useCentrosOperativos } from "../../hooks/centros/useCentrosOperativos";
import { Link } from "react-router-dom";

export default function CentrosOperativosList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");
  const [activo, setActivo] = useState<boolean | undefined>(undefined);

  const { data, isLoading } = useCentrosOperativos({
    page,
    pageSize,
    search,
    ciudad,
    estado,
    activo,
  });

  return (
    <div>
      <h1>Centros Operativos</h1>

      <div className="filters">
        <input
          placeholder="Buscar por nombre, clave, ciudad..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <input
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => {
            setCiudad(e.target.value);
            setPage(1);
          }}
        />

        <input
          placeholder="Estado"
          value={estado}
          onChange={(e) => {
            setEstado(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={activo === undefined ? "" : activo ? "true" : "false"}
          onChange={(e) => {
            const val = e.target.value;
            setActivo(val === "" ? undefined : val === "true");
            setPage(1);
          }}
        >
          <option value="">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>

        <Link to="/centros-operativos/nuevo" className="btn-primary">
          Nuevo Centro
        </Link>
      </div>

      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Clave</th>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Estado</th>
              <th>Dirección</th>
              <th>Activo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((c) => (
              <tr key={c.id}>
                <td>{c.clave}</td>
                <td>{c.nombre}</td>
                <td>{c.ciudad}</td>
                <td>{c.estado}</td>
                <td>{c.direccion ?? "—"}</td>
                <td>{c.activo ? "Sí" : "No"}</td>
                <td>
                  <Link to={`/centros-operativos/editar/${c.id}`}>Editar</Link>
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
