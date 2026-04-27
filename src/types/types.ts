// =========================
// ENUMS
// =========================

export enum TipoDomicilio {
  FISCAL = "FISCAL",
  ENTREGA = "ENTREGA",
  SUCURSAL = "SUCURSAL",
  OTRO = "OTRO",
}

// =========================
// INTERFACES
// =========================

export interface Municipio {
  id: number;
  nombre: string;
  ciudad: string;
  estado: string;
  colonia: string;
  codigoPostal: string;
}

export interface Domicilio {
  id?: number;
  clienteId?: number;
  tipoDomicilio: TipoDomicilio;
  nombre?: string | null;
  calle: string;
  numero: string;
  codigoPostal: string;
  colonia: string;
  ciudad: string;
  estado: string;
  municipioId?: number | null;
  celular?: string | null;
  telefono2?: string | null;
  correo?: string | null;
  email?: string | null;
}

export interface Cliente {
  id?: number;
  tipo: string;
  nombre: string;
  rfc?: string | null;
  calle: string;
  numero: string;
  codigoPostal: string;
  colonia: string;
  ciudad: string;
  estado?: string | null;
  municipioId?: number | null;
  celular: string;
  telefono2?: string | null;
  correo?: string | null;
  email?: string | null;
  datosAdicionales?: string | null;
  descuento: number;
  requiereFactura: boolean;
  retencionIVA: boolean;
  codigo: string;
  activo: boolean;
  fechaRegistro?: string;
  domicilios?: Domicilio[];
}
