export interface Guia {
  id: number;
  codigo: string;
  municipioId: number;
  peso: number;
  largo: number;
  ancho: number;
  alto: number;
  peso_predominante: number;
  costo: number;
  estado: string;
  remitente_nombre?: string | null;
  remitente_telefono?: string | null;
  remitente_direccion?: string | null;
  destinatario_nombre?: string | null;
  destinatario_telefono?: string | null;
  destinatario_direccion?: string | null;
}
