import api from "../api";

// Obtener lista de roles desde el backend
export function obtenerRoles() {
  return api.get("/roles");
}