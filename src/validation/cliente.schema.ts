import { z } from "zod";

export const domicilioSchema = z.object({
  calle: z.string().min(1),
  numero: z.string().min(1),
  colonia: z.string().min(1),
  codigoPostal: z.string().min(5).max(5),
  ciudad: z.string().min(1),
  estado: z.string().min(1),
  municipio: z.string().min(1),
});

export const clienteSchema = z.object({
  tipo: z.string().min(1),
  nombre: z.string().min(1),
  rfc: z.string().optional().or(z.literal("")),

  calle: z.string().min(1),
  numero: z.string().min(1),
  codigoPostal: z.string().min(5).max(5),
  colonias: z.string().min(1),
  ciudad: z.string().min(1),
  estado: z.string().min(1),
  municipio: z.string().min(1),

  celular: z.string().min(1),
  telefono2: z.string().optional().or(z.literal("")),
  correo: z.string().email().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  datosAdicionales: z.string().optional().or(z.literal("")),

  descuento: z.number().min(0).max(100),
  requiereFactura: z.boolean(),
  retencionIVA: z.boolean(),
  activo: z.boolean(),

  domicilios: z.array(domicilioSchema).default([]),
});

export type ClienteFormData = z.infer<typeof clienteSchema>;
