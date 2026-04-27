// src/services/combustible.service.ts
import api from "@/api/api";

// ===============================
// Tipos
// ===============================
export interface CargaCombustible {
  id: number;
  unidadId: number;
  litros: number;
  costo: number;
  tipoCombustible?: string;
  kmActual?: number;
  rendimientoCalculado?: number;
  fecha: string;
  [key: string]: unknown;
}

export interface CrearCargaCombustibleDTO {
  unidadId: number;
  litros: number;
  costo: number;
  tipoCombustible?: string;
  kmActual?: number;
  fecha: string;
}

// ===============================
// Servicios
// ===============================

// Obtener cargas de combustible de una unidad
export function listarCargasCombustible(
  unidadId: number
): Promise<CargaCombustible[]> {
  return api.get(`/combustible/${unidadId}`);
}

// Crear una nueva carga de combustible
export function crearCargaCombustible(
  data: CrearCargaCombustibleDTO
): Promise<CargaCombustible> {
  return api.post("/combustible", data);
}
