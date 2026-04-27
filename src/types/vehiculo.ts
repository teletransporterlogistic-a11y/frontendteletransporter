export interface Vehiculo {
  id: number;
  tipo: string;
  marca?: string | null;
  modelo?: string | null;
  anio?: number | null;
  placas: string;
  capacidadKg: number;
  volumenM3: number;
  estado: string;
  operadorId?: number | null;
  centroOperativoId?: number | null;
}
