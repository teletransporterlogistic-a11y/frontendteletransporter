// src/services/unidades.service.ts
import api from "@/api/api";

// ===============================
// Tipos
// ===============================
export interface Unidad {
  id: number;
  unidadId: string;
  nombre: string;
  tipo: string;
  estado: string;
  kmAcumulados: number;
  rendimientoKmL?: number;
  ultimoServicio?: string;
  proximoServicio?: string;
  actualizadoEn?: string;
  [key: string]: unknown;
}

export interface CrearUnidadDTO {
  unidadId: string;
  nombre: string;
  tipo: string;
  estado: string;
  kmAcumulados: number;
  rendimientoKmL?: number;
}

export interface ActualizarUnidadDTO extends Partial<CrearUnidadDTO> {}

// ===============================
// Servicio principal
// ===============================
const unidadesService = {
  // Obtener todas las unidades
  obtenerUnidades: async (): Promise<Unidad[]> => {
    return api.get("/unidades");
  },

  // Crear unidad
  crearUnidad: async (data: CrearUnidadDTO): Promise<Unidad> => {
    return api.post("/unidades", data);
  },

  // Actualizar unidad
  actualizarUnidad: async (
    id: number,
    data: ActualizarUnidadDTO
  ): Promise<Unidad> => {
    return api.put(`/unidades/${id}`, data);
  }
};

export default unidadesService;
