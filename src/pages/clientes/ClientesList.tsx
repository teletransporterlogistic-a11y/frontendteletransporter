import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import "./ClientesList.css";

export default function ClientesList() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [filtro, setFiltro] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

  const navigate = useNavigate();
  const location = useLocation();

  // Detectar si estamos en modo selección
  const selectMode =
    new URLSearchParams(location.search).get("selectMode") === "true";

  const fromEntrega = location.state?.fromEntrega || null;

  useEffect(() => {
    api.get("/clientes").then((res) => setClientes(res.data));
  }, []);

  // -----------------------------
  // FILTROS
  // -----------------------------
  const filtrados = clientes.filter((c) => {
    return (
      (filtro === "" ||
        c.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
        c.rfc?.toLowerCase().includes(filtro.toLowerCase()) ||
        c.celular?.includes(filtro)) &&
      (ciudad === "" || c.ciudad === ciudad) &&
      (estado === "" || c.estado === estado) &&
      (municipio === "" || c.municipio === municipio)
    );
  });

  // -----------------------------
  // PAGINACIÓN
  // -----------------------------
  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const visibles = filtrados.slice(inicio, inicio + porPagina);

  // -----------------------------
  // EXPORTAR EXCEL
  // -----------------------------
  function exportarExcel() {
    const hoja = XLSX.utils.json_to_sheet(clientes);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Clientes");
    XLSX.writeFile(libro, "clientes.xlsx");
  }

  // -----------------------------
  // SELECCIÓN DE CLIENTES
  // -----------------------------
  function toggleSeleccion(id: string) {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function seleccionarTodos() {
    if (seleccionados.length === visibles.length) {
      setSeleccionados([]);
    } else {
      setSeleccionados(visibles.map((c) => c.id));
    }
  }

  // -----------------------------
  // ACCIONES MASIVAS
  // -----------------------------
  function editarSeleccionado() {
    if (seleccionados.length === 1) {
      navigate(`/clientes/editar/${seleccionados[0]}`);
    } else {
      alert("Selecciona solo 1 cliente para editar");
    }
  }

  function eliminarSeleccionado() {
    if (seleccionados.length === 1) {
      navigate(`/clientes/eliminar/${seleccionados[0]}`);
    } else {
      alert("Selecciona solo 1 cliente para eliminar");
    }
  }

  // -----------------------------
  // SELECCIONAR CLIENTE PARA ENTREGA
  // -----------------------------
  function seleccionarCliente(c: any) {
    if (fromEntrega) {
      navigate(`/entregas/${fromEntrega}`, {
        state: {
          clienteSeleccionado: c,
        },
      });
    } else {
      navigate(-1, {
        state: {
          clienteSeleccionado: c,
        },
      });
    }
  }

  return (
    <div className="card">
      <h2>
        {selectMode ? "Seleccionar cliente" : "Clientes"}
      </h2>

      {/* ACCIONES MASIVAS (solo modo normal) */}
      {!selectMode && (
        <div className="acciones-masivas">
          <button
            className="btn-small"
            disabled={seleccionados.length !== 1}
            onClick={editarSeleccionado}
          >
            Editar seleccionado
          </button>

          <button
            className="btn-small btn-danger"
            disabled={seleccionados.length !== 1}
            onClick={eliminarSeleccionado}
          >
            Eliminar seleccionado
          </button>
        </div>
      )}

      {/* FILTROS */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nombre, RFC o celular"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
          <option value="">Ciudad</option>
          {[...new Set(clientes.map((c) => c.ciudad))].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select value={municipio} onChange={(e) => setMunicipio(e.target.value)}>
          <option value="">Municipio</option>
          {[...new Set(clientes.map((c) => c.municipio))].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Estado</option>
          {[...new Set(clientes.map((c) => c.estado))].map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>

        {!selectMode && (
          <button className="btn-excel" onClick={exportarExcel}>
            Exportar Excel
          </button>
        )}
      </div>

      {/* TABLA */}
      <table className="tabla-clientes">
        <thead>
          <tr>
            {selectMode && <th>Acción</th>}

            {!selectMode && (
              <th>
                <input
                  type="checkbox"
                  checked={
                    seleccionados.length === visibles.length &&
                    visibles.length > 0
                  }
                  onChange={seleccionarTodos}
                />
              </th>
            )}

            <th>Código</th>
            <th>Tipo</th>
            <th>Nombre</th>
            <th>RFC</th>
            <th>Calle</th>
            <th>Número</th>
            <th>Colonia</th>
            <th>CP</th>
            <th>Ciudad</th>
            <th>Municipio</th>
            <th>Estado</th>
            <th>Celular</th>
            <th>Teléfono 2</th>
            <th>Correo</th>
            <th>Email</th>
            <th>Factura</th>
            <th>IVA</th>
            <th>Descuento</th>
            <th>Datos adicionales</th>
            <th>Domicilios adicionales</th>

            {!selectMode && <th>Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {visibles.map((c) => (
            <tr key={c.id}>
              {selectMode && (
                <td>
                  <button
                    className="btn-small btn-primary"
                    onClick={() => seleccionarCliente(c)}
                  >
                    Seleccionar
                  </button>
                </td>
              )}

              {!selectMode && (
                <td>
                  <input
                    type="checkbox"
                    checked={seleccionados.includes(c.id)}
                    onChange={() => toggleSeleccion(c.id)}
                  />
                </td>
              )}

              <td>{c.codigo}</td>
              <td>{c.tipo}</td>
              <td>{c.nombre}</td>
              <td>{c.rfc}</td>
              <td>{c.calle}</td>
              <td>{c.numero}</td>
              <td>{c.colonias}</td>
              <td>{c.codigoPostal}</td>
              <td>{c.ciudad}</td>
              <td>{c.municipio}</td>
              <td>{c.estado}</td>
              <td>{c.celular}</td>
              <td>{c.telefono2}</td>
              <td>{c.correo}</td>
              <td>{c.email}</td>
              <td>{c.requiereFactura ? "Sí" : "No"}</td>
              <td>{c.retencionIVA ? "Sí" : "No"}</td>
              <td>{c.descuento}%</td>
              <td>{c.datosAdicionales || "—"}</td>
              <td>{c.domicilios?.length || 0}</td>

              {!selectMode && (
                <td>
                  <Link to={`/clientes/editar/${c.id}`} className="btn-small">
                    Editar
                  </Link>
                  <Link
                    to={`/clientes/eliminar/${c.id}`}
                    className="btn-small btn-danger"
                  >
                    Eliminar
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      <div className="paginacion">
        <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
          Anterior
        </button>

        <span>
          Página {pagina} de {totalPaginas}
        </span>

        <button
          disabled={pagina === totalPaginas}
          onClick={() => setPagina(pagina + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
