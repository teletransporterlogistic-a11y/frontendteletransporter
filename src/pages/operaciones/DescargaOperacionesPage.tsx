// src/pages/operaciones/DescargaOperacionesPage.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import api from "@/api/api";
import BotonRegresar from "@/components/BotonRegresar";
import "./Operaciones.css";

// ===============================
// Tipos
// ===============================
interface Envio {
  id: number;
  guia: string;
  remitenteNombre: string;
  destinatarioNombre: string;
  destinatarioCiudad: string;
  destinatarioEstado: string;
  destinatarioMunicipio: string;
  peso: number;
}

interface Movimiento {
  id: number;
  tipo: string;
  fecha: string;
  usuario: string;
  municipio?: string | null;
  descripcion?: string | null;
}

// ===============================
// Componente
// ===============================
export default function DescargaOperacionesPage() {
  const [guia, setGuia] = useState("");
  const [envio, setEnvio] = useState<Envio | null>(null);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [observacion, setObservacion] = useState("");
  const [cargando, setCargando] = useState(false);

  // ===============================
  // Buscar envío por guía
  // ===============================
  async function buscarEnvio() {
    if (!guia.trim()) return;

    setCargando(true);
    try {
      const res = await api.get(`/envios/guia/${guia}`);
      setEnvio(res.data);

      const mov = await api.get(`/envios/${res.data.id}/movimientos`);
      setMovimientos(mov.data);
    } catch (err) {
      console.error(err);
      alert("No se encontró el envío");
      setEnvio(null);
      setMovimientos([]);
    } finally {
      setCargando(false);
    }
  }

  // ===============================
  // Registrar descarga en operaciones
  // ===============================
  async function registrarDescarga(e: FormEvent) {
    e.preventDefault();
    if (!envio) return;

    try {
      await api.post(`/envios/${envio.id}/movimientos`, {
        tipo: "DESCARGA_OPERACIONES",
        municipio: envio.destinatarioMunicipio, // 👈 SE GUARDA MUNICIPIO
        descripcion: observacion || null,
      });

      setObservacion("");

      const mov = await api.get(`/envios/${envio.id}/movimientos`);
      setMovimientos(mov.data);

      alert("Descarga registrada correctamente");
    } catch (err) {
      console.error(err);
      alert("Error registrando descarga");
    }
  }

  return (
    <div className="operaciones-wrapper">
      <BotonRegresar />
      <h2>Descarga en Operaciones</h2>

      {/* BUSCADOR */}
      <div className="card">
        <h3>Buscar envío</h3>

        <div className="form-grid">
          <input
            type="text"
            placeholder="Número de guía"
            value={guia}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setGuia(e.target.value)
            }
          />

          <button className="btn-primary" onClick={buscarEnvio}>
            Buscar
          </button>
        </div>
      </div>

      {/* DATOS DEL ENVÍO */}
      {envio && (
        <div className="card">
          <h3>Datos del envío</h3>

          <p><strong>Guía:</strong> {envio.guia}</p>
          <p><strong>Remitente:</strong> {envio.remitenteNombre}</p>
          <p><strong>Destinatario:</strong> {envio.destinatarioNombre}</p>

          <p>
            <strong>Destino:</strong>{" "}
            {envio.destinatarioMunicipio},{" "}
            {envio.destinatarioCiudad},{" "}
            {envio.destinatarioEstado}
          </p>

          <p><strong>Peso:</strong> {envio.peso} kg</p>
        </div>
      )}

      {/* REGISTRO DE DESCARGA */}
      {envio && (
        <div className="card">
          <h3>Registrar descarga</h3>

          <form className="form-grid" onSubmit={registrarDescarga}>
            <div>
              <label>Observación (opcional)</label>
              <input
                type="text"
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button className="btn-primary" type="submit">
                Registrar descarga
              </button>
            </div>
          </form>
        </div>
      )}

      {/* HISTORIAL */}
      {envio && (
        <div className="card">
          <h3>Historial de movimientos</h3>

          {cargando ? (
            <div>Cargando...</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Usuario</th>
                  <th>Municipio</th>
                  <th>Descripción</th>
                </tr>
              </thead>

              <tbody>
                {movimientos.map((m) => (
                  <tr key={m.id}>
                    <td>{new Date(m.fecha).toLocaleString()}</td>
                    <td>{m.tipo}</td>
                    <td>{m.usuario}</td>
                    <td>{m.municipio ?? "-"}</td>
                    <td>{m.descripcion || "-"}</td>
                  </tr>
                ))}

                {movimientos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="no-data">
                      No hay movimientos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
