import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "./ListaEnvios.css";

export default function ListaEnvios() {
  const [envios, setEnvios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Filtros
  const [cliente, setCliente] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [ciudadOrigen, setCiudadOrigen] = useState("");
  const [ciudadDestino, setCiudadDestino] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  async function cargarEnvios() {
    setCargando(true);

    try {
      const res = await api.get("/envios", {
        params: {
          search: cliente || destinatario || "",
          clienteNombre: cliente || undefined,
          destinatarioNombre: destinatario || undefined,
          remitenteCiudad: ciudadOrigen || undefined,
          destinatarioCiudad: ciudadDestino || undefined,
          fechaInicio: fechaInicio || undefined,
          fechaFin: fechaFin || undefined,
          page: 1,
          pageSize: 50,
        },
      });

      const lista = res.data?.data || [];

      const normalizados = lista.map((e) => ({
        id: e.id,
        guia: e.guia,
        cliente: e.cliente?.nombre ?? e.remitenteNombre ?? "—",
        origen: `${e.remitenteCiudad ?? "—"}, ${e.remitenteEstado ?? ""}`,
        destino: `${e.destinatarioCiudad ?? "—"}, ${e.destinatarioEstado ?? ""}`,
        servicio: "Paquetería",
        precio: e.total ?? e.costoTotal ?? 0,
      }));

      setEnvios(normalizados);
    } catch (err) {
      console.error("Error cargando envíos:", err);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarEnvios();
  }, []);

  async function eliminarEnvio(id) {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este envío?");
    if (!confirmar) return;

    try {
      await api.delete(`/envios/${id}`);

      setEnvios((prev) => prev.filter((e) => e.id !== id));

      alert("Envío eliminado correctamente.");
    } catch (err) {
      console.error("Error eliminando envío:", err);
      alert("No se pudo eliminar el envío.");
    }
  }

  function limpiarFiltros() {
    setCliente("");
    setDestinatario("");
    setCiudadOrigen("");
    setCiudadDestino("");
    setFechaInicio("");
    setFechaFin("");
    cargarEnvios();
  }

  if (cargando) {
    return <div className="loading">Cargando envíos...</div>;
  }

  return (
    <div className="lista-envios-wrapper">

      <div className="lista-envios-header">
        <h2>Envíos</h2>
        <Link className="btn-primary" to="/envios/nuevo">
          + Nuevo Envío
        </Link>
      </div>

      {/* PANEL DE FILTROS */}
      <div className="filtros-card">

        <div className="filtros-row">

          <div className="filtro">
            <label>Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Nombre del cliente"
            />
          </div>

          <div className="filtro">
            <label>Destinatario</label>
            <input
              type="text"
              value={destinatario}
              onChange={(e) => setDestinatario(e.target.value)}
              placeholder="Nombre del destinatario"
            />
          </div>

          <div className="filtro">
            <label>Ciudad origen</label>
            <input
              type="text"
              value={ciudadOrigen}
              onChange={(e) => setCiudadOrigen(e.target.value)}
              placeholder="Morelia, Uruapan..."
            />
          </div>

          <div className="filtro">
            <label>Ciudad destino</label>
            <input
              type="text"
              value={ciudadDestino}
              onChange={(e) => setCiudadDestino(e.target.value)}
              placeholder="Zacapu, Pátzcuaro..."
            />
          </div>

        </div>

        <div className="filtros-row">

          <div className="filtro">
            <label>Fecha inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div className="filtro">
            <label>Fecha fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>

        </div>

        <div className="filtros-actions">
          <button className="btn-primary" onClick={cargarEnvios}>
            Buscar
          </button>

          <button className="btn-secondary" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="card lista-envios-card">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Guía</th>
              <th>Cliente</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Servicio</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {envios.map((e) => (
              <tr key={e.id}>
                <td>
                  <input type="checkbox" className="envio-checkbox" value={e.id} />
                </td>

                <td>{e.guia}</td>
                <td>{e.cliente}</td>
                <td>{e.origen}</td>
                <td>{e.destino}</td>
                <td>{e.servicio}</td>
                <td>${Number(e.precio).toFixed(2)}</td>

                <td className="acciones">
                  <Link className="btn-table btn-edit" to={`/envios/editar/${e.id}`}>
                    Editar
                  </Link>

                  <button
                    className="btn-table btn-danger"
                    onClick={() => eliminarEnvio(e.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {envios.length === 0 && (
              <tr>
                <td colSpan={8} className="no-data">
                  No hay envíos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
