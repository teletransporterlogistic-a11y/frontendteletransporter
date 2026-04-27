// src/pages/entregas/ListaEntregas.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";
import BotonRegresar from "@/components/BotonRegresar";
import "./ListaEntregas.css";

// ===============================
// Tipos
// ===============================
interface EnvioPendiente {
  id: number;
  guia: string;
  remitenteNombre: string;
  destinatarioNombre: string;
  destinatarioCiudad: string;
  destinatarioEstado: string;
  peso: number;
}

// ===============================
// Componente
// ===============================
export default function ListaEntregas() {
  const [envios, setEnvios] = useState<EnvioPendiente[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  const [guia, setGuia] = useState<string>("");
  const [cliente, setCliente] = useState<string>("");
  const [destinatario, setDestinatario] = useState<string>("");

  const navigate = useNavigate();

  // ===============================
  // Cargar envíos pendientes
  // ===============================
  async function cargarPendientes() {
    setCargando(true);

    try {
      const res = await api.get("/envios", {
        params: {
          estadoActualId: 4, // DOCUMENTADOS (pendientes de entrega)
          guia: guia || undefined,
          clienteNombre: cliente || undefined,
          destinatarioNombre: destinatario || undefined,
          page: 1,
          pageSize: 50
        }
      });

      setEnvios(res?.data ?? res?.data?.data ?? []);
    } catch (err) {
      console.error("Error cargando entregas:", err);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarPendientes();
  }, []);

  // ===============================
  // Limpiar filtros
  // ===============================
  function limpiar() {
    setGuia("");
    setCliente("");
    setDestinatario("");
    cargarPendientes();
  }

  // ===============================
  // Render
  // ===============================
  if (cargando) {
    return <div className="loading">Cargando mercancía...</div>;
  }

  return (
    <div className="entregas-wrapper">
      <BotonRegresar />

      <h2>Mercancía en almacén</h2>

      {/* FILTROS */}
      <div className="filtros-card">
        <div className="filtros-row">
          <div className="filtro">
            <label>Número de guía</label>
            <input
              type="text"
              value={guia}
              onChange={(e) => setGuia(e.target.value)}
              placeholder="TT-2026..."
            />
          </div>

          <div className="filtro">
            <label>Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Nombre del remitente"
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
        </div>

        <div className="filtros-actions">
          <button className="btn-primary" onClick={cargarPendientes}>
            Buscar
          </button>
          <button className="btn-secondary" onClick={limpiar}>
            Limpiar
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="card entregas-card">
        <table className="table">
          <thead>
            <tr>
              <th>Guía</th>
              <th>Cliente</th>
              <th>Destinatario</th>
              <th>Destino</th>
              <th>Peso</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {envios.map((e) => (
              <tr key={e.id}>
                <td>{e.guia}</td>
                <td>{e.remitenteNombre}</td>
                <td>{e.destinatarioNombre}</td>
                <td>
                  {e.destinatarioCiudad}, {e.destinatarioEstado}
                </td>
                <td>{e.peso} kg</td>

                <td>
                  <button
                    className="btn-primary"
                    onClick={() => navigate(`/entregas/proceso/${e.id}`)}
                  >
                    Entregar
                  </button>
                </td>
              </tr>
            ))}

            {envios.length === 0 && (
              <tr>
                <td colSpan={6} className="no-data">
                  No hay mercancía pendiente de entrega.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
