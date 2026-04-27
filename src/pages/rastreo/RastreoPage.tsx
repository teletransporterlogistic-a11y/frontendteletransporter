// src/pages/rastreo/RastreoPage.tsx
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import RastreoCard from "./RastreoCard";
import "./Rastreo.css";

// ===============================
// Tipos
// ===============================
export interface RastreoUpdate {
  envioId: number;
  cliente: string;
  operador: string;
  timestamp: string;
  estado: string; // EJ: "EN_RUTA", "ENTREGADO", etc.
}

// ===============================
// Componente
// ===============================
export default function RastreoPage() {
  const [trackingData, setTrackingData] = useState<RastreoUpdate[]>([]);
  const [connected, setConnected] = useState<boolean>(false);

  const API_URL = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    const socket: Socket = io(API_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("rastreo:update", (update: RastreoUpdate) => {
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

    return () => {
      socket.off("rastreo:update");
      socket.disconnect();
    };
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
