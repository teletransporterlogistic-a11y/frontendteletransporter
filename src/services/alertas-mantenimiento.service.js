// src/services/alertas-mantenimiento.service.js
import api from "../api/api.js";

// Obtener alertas de mantenimiento preventivo
export function obtenerAlertasServicios() {
  return api.get("/mantenimiento/alertas");
}
