// src/pages/rutas/CargarRutasPage.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import api from "@/api/api";
import BotonRegresar from "@/components/BotonRegresar";
import "./Rutas.css";

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

interface Ruta {
  id: number;
  nombre: string;
}

// ===============================
// Componente
// ===============================
export default function CargarRutasPage() {
  const [guia, setGuia] = useState("");
  const [envio, setEnvio] = useState<Envio | null>(null);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [rutaId, setRutaId] = useState("");
  const [observacion, setObservacion] = useState("");
  const [cargando, setCargando] = useState(false);

  // ===============================
  // Cargar rutas disponibles
  // ===============================
  useEffect(() => {
    async function cargarRutas() {
      try {
        const res = await api.get("/rutas");
        setRutas(res.data);
      } catch (err) {
        console.error("Error cargando rutas:", err);
      }
    }
    cargarRutas();
  }, []);

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
  // Registrar carga a ruta
  // ===============================
  async function registrarCargaRuta(e: FormEvent) {
    e.preventDefault();
    if (!envio) return;
    if (!rutaId) {
      alert("Selecciona una ruta");
      return;
    }

    try {
      await api.post(`/envios/${envio.id}/movimientos`, {
        tipo: "CARGA_RUTA",
        rutaId: Number(rutaId),
        municipio: envio.destinatarioMunicipio,
        descripcion: observacion || null,
      });

      setObservacion("");

      const mov = await api.get(`/envios/${envio.id}/movimientos`);
      setMovimientos(mov.data);

      alert("Carga a ruta registrada correctamente");
    } catch (err) {
      console.error(err);
      alert("Error registrando carga a ruta");
    }
  }

  return (
    <div className="rutas-wrapper">
      <BotonRegresar />
      <h2>Cargar Envío a Ruta</h2>

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

      {/* REGISTRO DE CARGA A RUTA */}
      {envio && (
        <div className="card">
          <h3>Asignar a ruta</h3>

          <form className="form-grid" onSubmit={registrarCargaRuta}>
            <div>
              <label>Ruta</label>
              <select
                value={rutaId}
                onChange={(e) => setRutaId(e.target.value)}
              >
                <option value="">Selecciona ruta</option>
                {rutas.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
              </select>
            </div>

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
                Registrar carga
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
