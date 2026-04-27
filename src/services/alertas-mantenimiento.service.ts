// src/services/alertas-mantenimiento.service.ts
import api from "@/api/api";

// ===============================
// Tipos
// ===============================
export interface AlertaMantenimiento {
  unidadId: number;
  unidad: string;
  kmActual: number;
  kmUltimoServicio: number;
  kmRestantes: number;
  tipoServicio: string;
  estado: "verde" | "amarillo" | "rojo";
  [key: string]: unknown;
}

// ===============================
// Servicio
// ===============================
export function obtenerAlertasServicios(): Promise<AlertaMantenimiento[]> {
  return api.get("/mantenimiento/alertas");
}
