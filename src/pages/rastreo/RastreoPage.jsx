import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import RastreoCard from "./RastreoCard";
import "./Rastreo.css";

export default function RastreoPage() {
  const [trackingData, setTrackingData] = useState([]);
  const [connected, setConnected] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Conexión correcta a Socket.IO
    const socket = io(API_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    // Escuchar eventos reales del backend
    socket.on("rastreo:update", (update) => {
      setTrackingData((prev) => {
        const exists = prev.find((p) => p.envioId === update.envioId);
        if (exists) {
          return prev.map((p) =>
            p.envioId === update.envioId ? { ...p, ...update } : p
          );
        }
        return [...prev, update];
      });
    });

    return () => socket.disconnect();
  }, [API_URL]);

  return (
    <div className="rastreo-container">
      <h1>Rastreo en Tiempo Real</h1>
      <p className="status-indicator">
        Estado del servidor:{" "}
        <span className={connected ? "online" : "offline"}>
          {connected ? "Conectado" : "Desconectado"}
        </span>
      </p>

      <div className="rastreo-grid">
        {trackingData.map((envio) => (
          <RastreoCard key={envio.envioId} envio={envio} />
        ))}
      </div>
    </div>
  );
}
