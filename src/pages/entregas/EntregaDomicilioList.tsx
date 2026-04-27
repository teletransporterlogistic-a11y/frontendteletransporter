// src/pages/entregas/EntregaDomicilioList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";
import BotonRegresar from "@/components/BotonRegresar";
import "./EntregaDomicilioList.css";

// ===============================
// Tipos
// ===============================
interface EnvioDomicilio {
  id: number;
  guia: string;
  remitenteNombre: string;
  destinatarioNombre: string;
  destinatarioDireccion: string;
  peso: number;
}

// ===============================
// Componente
// ===============================
export default function EntregaDomicilioList() {
  const [envios, setEnvios] = useState<EnvioDomicilio[]>([]);
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
          estado: "DOMICILIO", // 🔥 Envíos asignados a entrega a domicilio
          guia: guia || undefined,
          clienteNombre: cliente || undefined,
          destinatarioNombre: destinatario || undefined,
          page: 1,
          pageSize: 50
        }
      });

      setEnvios(res?.data ?? res?.data?.data ?? []);
    } catch (err) {
      console.error("Error cargando entregas a domicilio:", err);
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
    return <div className="loading">Cargando entregas a domicilio...</div>;
  }

  return (
    <div className="entregas-wrapper">
      <BotonRegresar />

      <h2>Entregas a domicilio</h2>

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
              <th>Dirección</th>
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
                <td>{e.destinatarioDireccion}</td>
                <td>{e.peso} kg</td>

                <td>
                  <button
                    className="btn-primary"
                    onClick={() =>
                      navigate(`/entregas/domicilio/proceso/${e.id}`)
                    }
                  >
                    Entregar
                  </button>
                </td>
              </tr>
            ))}

            {envios.length === 0 && (
              <tr>
                <td colSpan={6} className="no-data">
                  No hay entregas a domicilio pendientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
