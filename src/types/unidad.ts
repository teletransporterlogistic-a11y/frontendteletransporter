export interface Unidad {
  id: number;
  unidadId: string;
  nombre: string;
  tipo: string;
  estado: string;
  kmAcumulados: number;
  rendimientoKmL: number;
  ultimoServicio?: string | null;
  proximoServicio?: string | null;
  actualizadoEn: string;
}
