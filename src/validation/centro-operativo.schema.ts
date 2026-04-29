import { z } from "zod";

export const centroOperativoSchema = z.object({
  nombre: z.string().min(1),
  clave: z.string().min(1),
  ciudad: z.string().min(1),
  estado: z.string().min(1),
  direccion: z.string().optional().nullable(),
  activo: z.boolean(),
});

export type CentroOperativoFormData = z.infer<typeof centroOperativoSchema>;
