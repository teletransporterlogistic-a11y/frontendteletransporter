import { z } from "zod";

export const usuarioSchema = z.object({
  id: z.coerce.number().optional(),

  nombre: z.string().min(1, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(8, "Teléfono inválido"),

  rolId: z.coerce.number().min(1, "Rol requerido"),

  password: z.string().min(6, "Mínimo 6 caracteres").optional(),
});

export type UsuarioFormData = z.infer<typeof usuarioSchema>;
