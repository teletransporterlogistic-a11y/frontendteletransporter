import { io } from "socket.io-client";

export function connectTrackingSocket(onUpdate) {
  const API_URL = import.meta.env.VITE_API_URL;

  // Conexión correcta a Socket.IO (compatible con Railway)
  const socket = io(API_URL, {
    transports: ["websocket"],
  });

  // Evento real emitido por tu backend
  socket.on("rastreo:update", (data) => {
    onUpdate(data);
  });

  return socket;
}
