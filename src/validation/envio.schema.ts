import { z } from "zod";

export const envioSchema = z.object({
  id: z.coerce.number().optional(),

  codigo: z.string().min(1, "El código es obligatorio"),

  remitente_nombre: z.string().min(1, "Nombre requerido"),
  remitente_telefono: z.string().min(1, "Teléfono requerido"),
  remitente_direccion: z.string().min(1, "Dirección requerida"),

  destinatario_nombre: z.string().min(1, "Nombre requerido"),
  destinatario_telefono: z.string().min(1, "Teléfono requerido"),
  destinatario_direccion: z.string().min(1, "Dirección requerida"),

  municipioId: z.coerce.number().min(1, "Municipio inválido"),

  peso: z.coerce.number().min(0.1),
  largo: z.coerce.number().min(1),
  ancho: z.coerce.number().min(1),
  alto: z.coerce.number().min(1),

  peso_predominante: z.coerce.number().min(0),
  costo: z.coerce.number().min(0),

  estado: z.enum([
    "PENDIENTE",
    "EN_RECOLECCION",
    "EN_TRANSITO",
    "EN_REPARTO",
    "ENTREGADO",
    "INCIDENCIA",
  ]),
});

export type EnvioFormData = z.infer<typeof envioSchema>;
