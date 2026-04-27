export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password?: string;
  rolId: number;
  rol?: {
    id: number;
    nombre: string;
  };
}
