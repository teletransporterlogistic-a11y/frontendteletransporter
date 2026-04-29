import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

// Socket global para toda la app
export const socket = io(API_URL, {
  transports: ["websocket"], // necesario para Railway
});
