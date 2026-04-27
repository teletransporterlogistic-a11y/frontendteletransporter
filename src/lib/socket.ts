// src/socket/socket.ts
import { io, Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * Factory para crear sockets independientes.
 * Uso recomendado para evitar fugas de memoria y listeners duplicados.
 */
export function createSocket(): Socket {
  return io(API_URL, {
    transports: ["websocket"],
  });
}

/**
 * Socket global opcional.
 * Se exporta SOLO para compatibilidad con hooks antiguos.
 * Si no se usa, no afecta nada.
 */
export const socket: Socket = io(API_URL, {
  transports: ["websocket"],
});
