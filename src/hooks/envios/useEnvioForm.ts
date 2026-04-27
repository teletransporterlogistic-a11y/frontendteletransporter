import { useState } from "react";
import { envioSchema, EnvioFormData } from "../../validation/envio.schema";
import { z } from "zod";

export function useEnvioForm(initial?: Partial<EnvioFormData>) {
  const [form, setForm] = useState<EnvioFormData>({
    codigo: "",
    remitente_nombre: "",
    remitente_telefono: "",
    remitente_direccion: "",
    destinatario_nombre: "",
    destinatario_telefono: "",
    destinatario_direccion: "",
    municipioId: 0,
    peso: 0,
    largo: 0,
    ancho: 0,
    alto: 0,
    peso_predominante: 0,
    costo: 0,
    estado: "PENDIENTE",
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      envioSchema.parse(form);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formatted: Record<string, string> = {};
        err.errors.forEach((e) => (formatted[e.path.join(".")] = e.message));
        setErrors(formatted);
      }
      return false;
    }
  };

  const updateField = (field: keyof EnvioFormData, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const resetForm = () => setForm({ ...form });

  return { form, errors, validate, updateField, resetForm };
}
