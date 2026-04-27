import { z } from "zod";

export const rutaSchema = z.object({
  codigo: z.string().min(1),
  nombre: z.string().min(1),
  descripcion: z.string().optional().nullable(),
  operadorId: z.number().optional().nullable(),
  unidadId: z.number().optional().nullable(),
  activa: z.boolean(),
});

export type RutaFormData = z.infer<typeof rutaSchema>;
