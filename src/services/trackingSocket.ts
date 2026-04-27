import { io, Socket } from "socket.io-client";

// ===============================
// Tipos
// ===============================
export interface TrackingUpdate {
  envioId: number | string;
  lat: number;
  lng: number;
  velocidad?: number;
  timestamp?: string;
  [key: string]: unknown; // por si tu backend envía más campos
}

export type TrackingCallback = (data: TrackingUpdate) => void;

// ===============================
// Conexión al socket
// ===============================
export function connectTrackingSocket(onUpdate: TrackingCallback): Socket {
  const API_URL = import.meta.env.VITE_API_URL;

  const socket: Socket = io(API_URL, {
    transports: ["websocket"]
  });

  // Evento emitido por tu backend NestJS
  socket.on("rastreo:update", (data: TrackingUpdate) => {
    onUpdate(data);
  });

  return socket;
}
