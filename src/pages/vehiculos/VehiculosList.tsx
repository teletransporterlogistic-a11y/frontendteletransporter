import { useState } from "react";
import { useVehiculos } from "../../hooks/vehiculos/useVehiculos";
import { Link } from "react-router-dom";

export default function VehiculosList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [operadorId, setOperadorId] = useState<number | undefined>(undefined);
  const [centroOperativoId, setCentroOperativoId] = useState<number | undefined>(undefined);

  const { data, isLoading } = useVehiculos({
    page,
    pageSize,
    search,
    tipo,
    estado,
    operadorId,
    centroOperativoId,
  });

  return (
    <div>
      <h1>Vehículos</h1>

      {/* Filtros */}
      <div className="filters">
        <input
          placeholder="Buscar por placas, marca, modelo..."
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
          <option value="ACTIVO">Activo</option>
          <option value="INACTIVO">Inactivo</option>
          <option value="MANTENIMIENTO">Mantenimiento</option>
        </select>

        <Link to="/vehiculos/nuevo" className="btn-primary">
          Nuevo Vehículo
        </Link>
      </div>

      {/* Tabla */}
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Placas</th>
              <th>Tipo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Capacidad (kg)</th>
              <th>Volumen (m³)</th>
              <th>Estado</th>
              <th>Operador</th>
              <th>Centro Operativo</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data?.data.map((v) => (
              <tr key={v.id}>
                <td>{v.placas}</td>
                <td>{v.tipo}</td>
                <td>{v.marca ?? "—"}</td>
                <td>{v.modelo ?? "—"}</td>
                <td>{v.anio ?? "—"}</td>
                <td>{v.capacidadKg.toLocaleString()}</td>
                <td>{v.volumenM3}</td>
                <td>{v.estado}</td>
                <td>{v.operador?.nombre ?? "—"}</td>
                <td>{v.centroOperativo?.nombre ?? "—"}</td>
                <td>
                  <Link to={`/vehiculos/editar/${v.id}`}>Editar</Link>
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
