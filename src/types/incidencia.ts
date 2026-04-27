export interface Incidencia {
  id: number;
  envioId: number;
  operadorId?: number | null;
  tipo: string;
  descripcion: string;
  evidenciaUrl?: string | null;
  lat?: number | null;
  lng?: number | null;
  estado: string;
  usuarioId?: number | null;
}
