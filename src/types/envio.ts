export interface Envio {
  id: number;
  guia: string;
  clienteId?: number | null;
  destino: string;
  fechaCreacion: string;
  operadorId?: number | null;
  estadoActualId?: number | null;
  ultimoEvento?: string | null;
  fechaEntrega?: string | null;
  intentosEntrega: number;
  tiempoPrometido?: number | null;

  remitenteNombre: string;
  remitenteCalle: string;
  remitenteNumero: string;
  remitenteColonia: string;
  remitenteCiudad: string;
  remitenteEstado: string;
  remitenteCP: string;
  remitenteTelefono?: string | null;
  remitenteCorreo?: string | null;
  remitenteRFC?: string | null;
  remitenteCelular?: string | null;

  destinatarioNombre: string;
  destinatarioCalle: string;
  destinatarioNumero: string;
  destinatarioColonia: string;
  destinatarioCiudad: string;
  destinatarioEstado: string;
  destinatarioCP: string;
  destinatarioTelefono: string;
  destinatarioCorreo?: string | null;
  destinatarioRFC?: string | null;
  destinatarioCelular?: string | null;

  peso?: number | null;
  largo?: number | null;
  ancho?: number | null;
  alto?: number | null;
  volumen?: number | null;
  volumenCm3?: number | null;
  descripcionContenido?: string | null;

  ciudadDestino: string;
  kmDestino?: number | null;
  tarifa?: string | null;
  costo?: number | null;
  costoBase?: number | null;
  costoServicios: number;
  costoSeguro: number;
  descuento: number;
  costoTotal: number;
  slaHoras: number;
  fechaPrometida: string;
  fechaDocumentado?: string | null;
  fechaGeneracion?: string | null;
}
