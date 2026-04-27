import { z } from "zod";

export const unidadSchema = z.object({
  unidadId: z.string().min(1),
  nombre: z.string().min(1),
  tipo: z.string().min(1),
  estado: z.string().min(1),
  kmAcumulados: z.number().min(0),
  rendimientoKmL: z.number().min(0),
  ultimoServicio: z.string().optional().nullable(),
  proximoServicio: z.string().optional().nullable(),
});

export type UnidadFormData = z.infer<typeof unidadSchema>;
