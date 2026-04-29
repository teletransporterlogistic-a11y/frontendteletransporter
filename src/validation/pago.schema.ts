import { z } from "zod";

export const pagoSchema = z.object({
  id: z.coerce.number().optional(),

  envioId: z.coerce.number().min(1),
  monto: z.coerce.number().min(1),
  metodo: z.enum(["EFECTIVO", "TARJETA", "TRANSFERENCIA"]),

  referencia: z.string().optional().nullable(),
});

export type PagoFormData = z.infer<typeof pagoSchema>;
