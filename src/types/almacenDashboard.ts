export interface AlmacenKPI {
  totalInventario: number;
  movimientosHoy: number;
  pickingHoy: number;
  packingHoy: number;
  salidasHoy: number;
}

export interface OperadorProductividad {
  operadorId: number;
  nombre: string;
  movimientos: number;
  picking: number;
  packing: number;
  salidas: number;
}

export interface HeatmapPunto {
  lat: number;
  lng: number;
  intensidad: number;
}
