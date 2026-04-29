import api from "../api/api.js";

export function listarCargasCombustible(unidadId) {
  return api.get(`/combustible/${unidadId}`);
}

export function crearCargaCombustible(data) {
  return api.post("/combustible", data);
}
