import { useState } from "react";
import { usePagos } from "../../hooks/pagos/usePagos";
import { Link } from "react-router-dom";

export default function PagosList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [metodo, setMetodo] = useState("");
  const [clienteId, setClienteId] = useState<number | undefined>(undefined);

  const { data, isLoading } = usePagos({
    page,
    pageSize,
    search,
    metodo,
    clienteId,
  });

  return (
    <div>
      <h1>Pagos</h1>

      <div className="filters">
        <input
          placeholder="Buscar referencia, guía, cliente..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={metodo}
          onChange={(e) => {
            setMetodo(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Todos los métodos</option>
          <option value="EFECTIVO">Efectivo</option>
          <option value="TARJETA">Tarjeta</option>
          <option value="TRANSFERENCIA">Transferencia</option>
          <option value="SPEI">SPEI</option>
          <option value="CREDITO">Crédito</option>
        </select>

        <Link to="/pagos/nuevo" className="btn-primary">
          Registrar Pago
        </Link>
      </div>

      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Guía</th>
              <th>Cliente</th>
              <th>Método</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data?.data.map((p) => (
              <tr key={p.id}>
                <td>{p.envio?.guia}</td>
                <td>{p.cliente?.nombre ?? "—"}</td>
                <td>{p.metodo}</td>
                <td>${p.monto.toFixed(2)}</td>
                <td>{new Date(p.fecha).toLocaleString()}</td>
                <td>
                  <Link to={`/pagos/editar/${p.id}`}>Editar</Link>
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
