import { z } from "zod";

export const movimientoSchema = z.object({
  id: z.coerce.number().optional(),

  tipo: z.enum(["ENTRADA", "SALIDA"]),
  descripcion: z.string().min(1),

  cantidad: z.coerce.number().min(1),
  productoId: z.coerce.number().min(1),

  fecha: z.string(),
});

export type MovimientoFormData = z.infer<typeof movimientoSchema>;
