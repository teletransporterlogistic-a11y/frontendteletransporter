export interface CentroOperativo {
  id: number;
  nombre: string;
  clave: string;
  ciudad: string;
  estado: string;
  direccion?: string | null;
  activo: boolean;
}
