// src/services/servicios-unidad.service.js
import api from "../api/api.js";

// Obtener servicios de una unidad
export function listarServiciosUnidad(unidadId) {
  return api.get(`/servicios-unidad/${unidadId}`);
}

// Crear un nuevo servicio para una unidad
export function crearServicioUnidad(data) {
  return api.post("/servicios-unidad", data);
}
