import { z } from "zod";

export const vehiculoSchema = z.object({
  id: z.coerce.number().optional(),

  placas: z.string().min(1),
  marca: z.string().min(1),
  modelo: z.string().min(1),
  capacidad: z.coerce.number().min(1),

  operadorId: z.coerce.number().optional(),
});

export type VehiculoFormData = z.infer<typeof vehiculoSchema>;
