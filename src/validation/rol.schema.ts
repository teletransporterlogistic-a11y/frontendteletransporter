import { z } from "zod";

export const rolSchema = z.object({
  nombre: z.string().min(1),
  tenant: z.string().min(1),
});

export type RolFormData = z.infer<typeof rolSchema>;
