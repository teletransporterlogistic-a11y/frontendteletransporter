// Evento individual del historial de rastreo
export interface RastreoEvento {
  id: number;
  envioId: number;
  estado: string;          // ej: "EN_RUTA", "ENTREGADO"
  lat?: number | null;
  lng?: number | null;
  detalle?: string | null;
  creadoEn: string;        // ISO date
}

// Último evento (para mapa y tiempo real)
export interface UltimoRastreo {
  id: number;
  estado: string;
  lat?: number | null;
  lng?: number | null;
  detalle?: string | null;
  creadoEn: string;
}

// Envío activo con su último evento (para mapa + filtros)
export interface EnvioActivo {
  id: number;
  folio?: string;
  estado: string;

  unidad?: {
    id: number;
    nombre: string;
  } | null;

  ruta?: {
    id: number;
    nombre: string;
  } | null;

  centroOperativo?: {
    id: number;
    nombre: string;
  } | null;

  // Último evento de rastreo
  rastreo: UltimoRastreo[];
}
