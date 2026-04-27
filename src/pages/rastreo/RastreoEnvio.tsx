// src/pages/rastreo/RastreoEnvio.tsx
import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { io, Socket } from "socket.io-client";

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";

import "./RastreoEnvio.css";

// ============================
// Tipos
// ============================
interface Posicion {
  latitud: number;
  longitud: number;
  fecha: string;
  envioId: number;
}

interface Envio {
  id: number;
  guia: string;
  estadoActual?: { nombre: string };
  operador?: { nombre: string };
  posiciones?: Posicion[];
}

interface SocketUpdate {
  envioId: number;
  latitud: number;
  longitud: number;
  fecha: string;
}

// ============================
// Componente
// ============================
export default function RastreoEnvio() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [envio, setEnvio] = useState<Envio | null>(null);
  const [posiciones, setPosiciones] = useState<Posicion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [guiaInput, setGuiaInput] = useState<string>("");

  const socketRef = useRef<Socket | null>(null);

  const API_URL = import.meta.env.VITE_API_URL as string;

  const iconOperador = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
  });

  // ============================
  // Cargar envío por ID
  // ============================
  async function cargarEnvioPorId(envioId: string) {
    try {
      const res = await fetch(`${API_URL}/envios/${envioId}`);
      const data: Envio | { error: string } = await res.json();

      if (!data || "error" in data) {
        Swal.fire("Error", "No se encontró el envío", "error");
        return;
      }

      setEnvio(data);
      setPosiciones(data.posiciones ?? []);
    } catch {
      Swal.fire("Error", "No se pudo conectar al servidor", "error");
    } finally {
      setLoading(false);
    }
  }

  // ============================
  // Cargar envío por guía
  // ============================
  async function cargarEnvioPorGuia(guia: string) {
    try {
      const res = await fetch(`${API_URL}/envios/guia/${guia}`);
      const data: Envio | { error: string } = await res.json();

      if (!data || "error" in data) {
        Swal.fire("Error", "No se encontró la guía", "error");
        return;
      }

      setEnvio(data);
      setPosiciones(data.posiciones ?? []);
    } catch {
      Swal.fire("Error", "No se pudo conectar al servidor", "error");
    } finally {
      setLoading(false);
    }
  }

  // ============================
  // Inicialización + Socket.IO
  // ============================
  useEffect(() => {
    const guiaQuery = searchParams.get("guia");

    if (id) {
      cargarEnvioPorId(id);
    } else if (guiaQuery) {
      setGuiaInput(guiaQuery);
      cargarEnvioPorGuia(guiaQuery);
    } else {
      setLoading(false);
    }

    socketRef.current = io(API_URL, {
      transports: ["websocket"],
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [id, API_URL]);

  // ============================
  // Socket: unirse a sala + escuchar eventos
  // ============================
  useEffect(() => {
    if (!envio || !socketRef.current) return;

    socketRef.current.emit("rastreo:joinEnvio", { envioId: envio.id });

    const handler = (data: SocketUpdate) => {
      if (data.envioId === envio.id) {
        setPosiciones((prev) => [...prev, data]);
      }
    };

    socketRef.current.on("rastreo:update", handler);

    return () => {
      socketRef.current?.off("rastreo:update", handler);
    };
  }, [envio]);

  // ============================
  // Buscar guía manualmente
  // ============================
  function buscarGuia(e: FormEvent) {
    e.preventDefault();
    if (!guiaInput.trim()) return;

    setLoading(true);
    cargarEnvioPorGuia(guiaInput);
  }

  if (loading) return <div className="loading">Cargando rastreo...</div>;

  const ultimaPos = posiciones[posiciones.length - 1];

  return (
    <div className="rastreo-container">
      <h1>Rastreo de Envío</h1>

      {!id && (
        <form className="rastreo-form" onSubmit={buscarGuia}>
          <input
            type="text"
            placeholder="Ingresa tu número de guía"
            value={guiaInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setGuiaInput(e.target.value)
            }
          />
          <button type="submit">Rastrear</button>
        </form>
      )}

      {id && (
        <button
          className="btn-secondary mb-20"
          onClick={() => navigate(`/envios/${id}`)}
        >
          ← Regresar al detalle
        </button>
      )}

      {envio && (
        <div className="info-card">
          <p><strong>Guía:</strong> {envio.guia}</p>
          <p><strong>Estado:</strong> {envio.estadoActual?.nombre}</p>
          <p><strong>Operador:</strong> {envio.operador?.nombre ?? "Sin asignar"}</p>
          <p>
            <strong>Última actualización:</strong>{" "}
            {ultimaPos ? new Date(ultimaPos.fecha).toLocaleString() : "Sin datos"}
          </p>
        </div>
      )}

      {ultimaPos ? (
        <MapContainer
          center={[ultimaPos.latitud, ultimaPos.longitud]}
          zoom={14}
          scrollWheelZoom={true}
          className="mapa"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker
            position={[ultimaPos.latitud, ultimaPos.longitud]}
            icon={iconOperador}
          >
            <Popup>
              Última posición<br />
              {new Date(ultimaPos.fecha).toLocaleString()}
            </Popup>
          </Marker>

          <Polyline
            positions={posiciones.map((p) => [p.latitud, p.longitud])}
            color="blue"
          />
        </MapContainer>
      ) : (
        <div className="sin-posiciones">Aún no hay posiciones registradas.</div>
      )}

      <div className="historial">
        <h2>Historial de posiciones</h2>

        {posiciones.length === 0 && <p>No hay posiciones registradas.</p>}

        {posiciones.map((p, i) => (
          <div key={i} className="pos-item">
            <strong>{new Date(p.fecha).toLocaleString()}</strong>
            <br />
            Lat: {p.latitud}, Lng: {p.longitud}
          </div>
        ))}
      </div>
    </div>
  );
}
