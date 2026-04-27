import { z } from "zod";

export const operadorSchema = z.object({
  id: z.coerce.number().optional(),

  nombre: z.string().min(1),
  telefono: z.string().min(8),
  licencia: z.string().min(1),

  centroOperativoId: z.coerce.number().min(1),
});

export type OperadorFormData = z.infer<typeof operadorSchema>;
