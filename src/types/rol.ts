export interface Permiso {
  id: number;
  accion: string;
  rolId: number;
}

export interface Rol {
  id: number;
  nombre: string;
  tenant: string;
  permiso: Permiso[];
}
