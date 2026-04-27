import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export function useRastreoRealtime(envioId = null, initialEvents = []) {
  const [eventos, setEventos] = useState(initialEvents);
  const socketRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Crear conexión Socket.IO correcta
    socketRef.current = io(API_URL, {
      transports: ["websocket"], // necesario para Railway
    });

    // Si es rastreo por envío → unirse a la sala
    if (envioId) {
      socketRef.current.emit("rastreo:joinEnvio", { envioId });
    }

    // Handler de eventos
    const handler = (evento) => {
      if (!envioId) {
        // modo global → aceptar todos
        setEventos((prev) => [...prev, evento]);
      } else if (evento.envioId === envioId) {
        // modo por envío → filtrar
        setEventos((prev) => [...prev, evento]);
      }
    };

    // Escuchar evento real del backend
    socketRef.current.on("rastreo:update", handler);

    // Cleanup
    return () => {
      socketRef.current.off("rastreo:update", handler);
      socketRef.current.disconnect();
    };
  }, [envioId]);

  return { eventos, setEventos };
}
