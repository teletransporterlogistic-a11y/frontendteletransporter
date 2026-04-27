export interface AlmacenInventario {
  id: number;
  envioId: number;
  estado: string; // EN_ALMACEN, PICKING, PACKING, SALIDA, ENTREGADO
  ubicacion?: string | null;
  centroOperativoId: number;
  creadoEn: string;
  actualizadoEn: string;

  envio?: {
    id: number;
    folio?: string;
    estado: string;
  };

  centroOperativo?: {
    id: number;
    nombre: string;
  };
}

export interface AlmacenMovimiento {
  id: number;
  envioId: number;
  tipo: string; // ENTRADA, SALIDA, PICKING, PACKING, AJUSTE
  detalle?: string | null;
  operadorId?: number | null;
  lat?: number | null;
  lng?: number | null;
  creadoEn: string;

  operador?: {
    id: number;
    nombre: string;
  };
}
