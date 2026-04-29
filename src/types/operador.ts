export interface Operador {
  id: number;
  nombre: string;
  telefono?: string | null;
  correo?: string | null;
  licencia?: string | null;
  activo: boolean;
  fechaAlta: string;
}
