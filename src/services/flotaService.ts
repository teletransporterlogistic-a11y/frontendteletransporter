// src/services/flotaService.ts
import api from "@/api/api";

// ===============================
// Tipos
// ===============================
export interface Vehiculo {
  id: number;
  unidad: string;
  placas: string;
  tipo: string;
  capacidad: number;
  [key: string]: unknown;
}

export interface Mantenimiento {
  id: number;
  vehiculoId: number;
  descripcion: string;
  fecha: string;
  costo?: number;
  [key: string]: unknown;
}

export interface CrearVehiculoDTO {
  unidad: string;
  placas: string;
  tipo: string;
  capacidad: number;
}

export interface CrearMantenimientoDTO {
  descripcion: string;
  fecha: string;
  costo?: number;
}

// ===============================
// Normalizador seguro
// ===============================
function normalizeArray<T>(res: any): T[] {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.items)) return res.items;
  if (Array.isArray(res?.vehiculos)) return res.vehiculos;

  console.warn("⚠ Backend devolvió un formato inesperado:", res);
  return [];
}

// ===============================
// Servicio principal
// ===============================
const flotaService = {
  // Obtener vehículos
  obtenerVehiculos: async (): Promise<Vehiculo[]> => {
    const res = await api.get<any>("/vehiculos");
    return normalizeArray<Vehiculo>(res);
  },

  // Obtener mantenimientos de un vehículo
  obtenerMantenimientos: async (id: number): Promise<Mantenimiento[]> => {
    const res = await api.get<any>(`/vehiculos/${id}/mantenimientos`);
    return normalizeArray<Mantenimiento>(res);
  },

  // Crear vehículo
  crearVehiculo: async (data: CrearVehiculoDTO): Promise<Vehiculo> => {
    const res = await api.post<Vehiculo>("/vehiculos", data);
    return res;
  },

  // Crear mantenimiento
  crearMantenimiento: async (
    id: number,
    data: CrearMantenimientoDTO
  ): Promise<Mantenimiento> => {
    const res = await api.post<Mantenimiento>(
      `/vehiculos/${id}/mantenimientos`,
      data
    );
    return res;
  }
};

export default flotaService;
