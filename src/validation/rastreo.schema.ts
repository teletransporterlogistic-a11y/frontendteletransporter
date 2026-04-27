import { z } from "zod";

export const rastreoEventoSchema = z.object({
  id: z.coerce.number().optional(),

  envioId: z.coerce.number().min(1),
  estado: z.string().min(1),
  descripcion: z.string().optional().nullable(),

  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),

  fecha: z.string().min(1),
});

export type RastreoEvento = z.infer<typeof rastreoEventoSchema>;
