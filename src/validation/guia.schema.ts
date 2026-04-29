import { z } from "zod";

export const guiaSchema = z.object({
  codigo: z.string().min(1, "El código es obligatorio"),

  municipioId: z.coerce.number().min(1, "Municipio inválido"),

  peso: z.coerce.number().min(0.1, "El peso debe ser mayor a 0"),
  largo: z.coerce.number().min(1, "El largo debe ser mayor a 0"),
  ancho: z.coerce.number().min(1, "El ancho debe ser mayor a 0"),
  alto: z.coerce.number().min(1, "El alto debe ser mayor a 0"),

  peso_predominante: z.coerce.number().min(0),
  costo: z.coerce.number().min(0),

  estado: z.string().min(1),

  remitente_nombre: z.string().nullable().optional(),
  remitente_telefono: z.string().nullable().optional(),
  remitente_direccion: z.string().nullable().optional(),

  destinatario_nombre: z.string().nullable().optional(),
  destinatario_telefono: z.string().nullable().optional(),
  destinatario_direccion: z.string().nullable().optional(),
});

export type GuiaFormData = z.infer<typeof guiaSchema>;
