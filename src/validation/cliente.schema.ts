import { z } from "zod";

// ===============================
//  Domicilio adicional
// ===============================
export const domicilioSchema = z.object({
  calle: z.string().min(1, "La calle es obligatoria"),
  numero: z.string().min(1, "El número es obligatorio"),
  colonia: z.string().min(1, "La colonia es obligatoria"),
  codigoPostal: z.string().min(5).max(5),
  ciudad: z.string().min(1),
  estado: z.string().min(1),
  municipio: z.string().min(1),
});

// ===============================
//  Cliente principal
// ===============================
export const clienteSchema = z.object({
  tipo: z.string().min(1, "El tipo es obligatorio"),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  rfc: z.string().optional().or(z.literal("")),

  // Dirección principal
  calle: z.string().min(1),
  numero: z.string().min(1),
  codigoPostal: z.string().min(5).max(5),

  // ✔ Lista de colonias del CP
  colonias: z.array(z.string()).default([]),

  // ✔ Colonia seleccionada
  colonia: z.string().min(1, "La colonia es obligatoria"),

  ciudad: z.string().min(1),
  estado: z.string().min(1),
  municipio: z.string().min(1),

  // Contacto
  celular: z.string().min(1),
  telefono2: z.string().optional().or(z.literal("")),
  correo: z.string().email().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  datosAdicionales: z.string().optional().or(z.literal("")),

  // Opciones fiscales
  descuento: z.number().min(0).max(100),
  requiereFactura: z.boolean(),
  retencionIVA: z.boolean(),
  activo: z.boolean(),

  // Domicilios adicionales
  domicilios: z.array(domicilioSchema).default([]),
});

// ===============================
//  Tipo inferido
// ===============================
export type ClienteFormData = z.infer<typeof clienteSchema>;
