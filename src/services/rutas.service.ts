// src/services/rutas.service.ts

import api from "../api/api";
import { RutaFormData } from "../validation/ruta.schema";

// Obtener listado de rutas
export async function getRutas() {
  const { data } = await api.get("/rutas");
  return data;
}

// Obtener una ruta por ID
export async function getRutaById(id: number) {
  const { data } = await api.get(`/rutas/${id}`);
  return data;
}

// Crear una ruta
export async function createRuta(payload: RutaFormData) {
  const { data } = await api.post("/rutas", payload);
  return data;
}

// Actualizar una ruta
export async function updateRuta(id: number, payload: RutaFormData) {
  const { data } = await api.put(`/rutas/${id}`, payload);
  return data;
}

// Eliminar una ruta
export async function deleteRuta(id: number) {
  const { data } = await api.delete(`/rutas/${id}`);
  return data;
}
