// src/services/servicios-unidad.service.ts
import api from "@/api/api";

// ===============================
// Tipos
// ===============================
export interface ServicioUnidad {
  id: number;
  unidadId: number;
  tipo: string;
  descripcion?: string;
  fecha: string;
  costo?: number;
  [key: string]: unknown;
}

export interface CrearServicioUnidadDTO {
  unidadId: number;
  tipo: string;
  descripcion?: string;
  fecha: string;
  costo?: number;
}

// ===============================
// Servicios
// ===============================

// Obtener servicios de una unidad
export function listarServiciosUnidad(
  unidadId: number
): Promise<ServicioUnidad[]> {
  return api.get(`/servicios-unidad/${unidadId}`);
}

// Crear un nuevo servicio para una unidad
export function crearServicioUnidad(
  data: CrearServicioUnidadDTO
): Promise<ServicioUnidad> {
  return api.post("/servicios-unidad", data);
}