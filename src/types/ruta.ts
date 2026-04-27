export interface RutaParada {
  id?: number;
  municipioId: number;
  orden: number;
  municipio?: {
    id: number;
    nombre: string;
  };
}

export interface Ruta {
  id: number;
  codigo: string;
  nombre: string;
  descripcion?: string | null;
  operadorId?: number | null;
  unidadId?: number | null;
  activa: boolean;
  fechaCreacion: string;
  paradas: RutaParada[];
}
