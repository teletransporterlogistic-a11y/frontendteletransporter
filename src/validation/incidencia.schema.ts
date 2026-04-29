import { z } from "zod";

export const incidenciaSchema = z.object({
  envioId: z.number(),
  operadorId: z.number().optional().nullable(),
  tipo: z.string().min(1),
  descripcion: z.string().min(1),
  evidenciaUrl: z.string().optional().nullable(),
  lat: z.number().optional().nullable(),
  lng: z.number().optional().nullable(),
  estado: z.string().min(1),
  usuarioId: z.number().optional().nullable(),
});

export type IncidenciaFormData = z.infer<typeof incidenciaSchema>;
