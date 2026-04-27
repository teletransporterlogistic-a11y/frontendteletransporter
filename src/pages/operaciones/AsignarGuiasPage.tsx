// src/pages/rutas/AsignacionGuiasPage.tsx
import { useEffect, useState, ChangeEvent } from "react";
import api from "@/api/api";
import BotonRegresar from "@/components/BotonRegresar";
import "./Rutas.css";

// ===============================
// Tipos
// ===============================
interface Envio {
  id: number;
  guia: string;
  destinatarioNombre: string;
  destinatarioMunicipio: string;
  destinatarioCiudad: string;
  destinatarioEstado: string;
  peso: number;
}

interface Ruta {
  id: number;
  nombre: string;
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
export default function AsignacionGuiasPage() {
  const [search, setSearch] = useState("");
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [rutaId, setRutaId] = useState("");
  const [cargando, setCargando] = useState(false);

  // ===============================
  // Cargar rutas
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
  // Buscar guías
  // ===============================
  async function buscarGuias() {
    if (!search.trim()) return;

    setCargando(true);
    try {
      const res = await api.get("/envios/buscar", {
        params: { search },
      });
      setEnvios(res.data);
      setSeleccionados([]);
    } catch (err) {
      console.error(err);
      alert("Error buscando guías");
    } finally {
      setCargando(false);
    }
  }

  // ===============================
  // Seleccionar / deseleccionar guías
  // ===============================
  function toggleSeleccion(id: number) {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // ===============================
  // Asignar guías a ruta
  // ===============================
  async function asignarGuias() {
    if (!rutaId) {
      alert("Selecciona una ruta");
      return;
    }
    if (seleccionados.length === 0) {
      alert("Selecciona al menos una guía");
      return;
    }

    try {
      await api.post("/rutas/asignar-guias", {
        rutaId: Number(rutaId),
        envios: seleccionados,
      });

      alert("Guías asignadas correctamente");

      // Recargar resultados
      buscarGuias();
    } catch (err) {
      console.error(err);
      alert("Error asignando guías");
    }
  }

  return (
    <div className="rutas-wrapper">
      <BotonRegresar />
      <h2>Asignación de Guías a Ruta</h2>

      {/* BUSCADOR */}
      <div className="card">
        <h3>Buscar guías</h3>

        <div className="form-grid">
          <input
            type="text"
            placeholder="Guía, destinatario, municipio..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />

          <button className="btn-primary" onClick={buscarGuias}>
            Buscar
          </button>
        </div>
      </div>

      {/* SELECCIÓN DE RUTA */}
      <div className="card">
        <h3>Seleccionar ruta</h3>

        <select
          value={rutaId}
          onChange={(e) => setRutaId(e.target.value)}
          className="input"
        >
          <option value="">Selecciona ruta</option>
          {rutas.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* TABLA DE GUÍAS */}
      <div className="card">
        <h3>Resultados</h3>

        {cargando ? (
          <div>Cargando...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Guía</th>
                <th>Destinatario</th>
                <th>Municipio</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Peso</th>
              </tr>
            </thead>

            <tbody>
              {envios.map((e) => (
                <tr key={e.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(e.id)}
                      onChange={() => toggleSeleccion(e.id)}
                    />
                  </td>
                  <td>{e.guia}</td>
                  <td>{e.destinatarioNombre}</td>
                  <td>{e.destinatarioMunicipio}</td>
                  <td>{e.destinatarioCiudad}</td>
                  <td>{e.destinatarioEstado}</td>
                  <td>{e.peso} kg</td>
                </tr>
              ))}

              {envios.length === 0 && (
                <tr>
                  <td colSpan={7} className="no-data">
                    No hay resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* BOTÓN DE ASIGNACIÓN */}
        <div className="form-actions mt-4">
          <button className="btn-primary" onClick={asignarGuias}>
            Asignar guías a ruta
          </button>
        </div>
      </div>
    </div>
  );
}
