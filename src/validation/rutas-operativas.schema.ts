import { z } from "zod";

export const rutaOperativaSchema = z.object({
  id: z.coerce.number().optional(),

  nombre: z.string().min(1),
  operadorId: z.coerce.number().min(1),

  puntos: z
    .array(
      z.object({
        lat: z.coerce.number(),
        lng: z.coerce.number(),
        orden: z.coerce.number(),
      })
    )
    .min(1),
});

export type RutaOperativaFormData = z.infer<typeof rutaOperativaSchema>;
