import { useState } from "react";
import { rutaSchema, RutaFormData } from "../../validation/ruta.schema";
import { z } from "zod";

export function useRutaForm(initial?: Partial<RutaFormData>) {
  const [form, setForm] = useState<RutaFormData>({
    nombre: "",
    descripcion: "",
    activo: true,
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      rutaSchema.parse(form);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formatted: Record<string, string> = {};
        err.errors.forEach((e) => {
          formatted[e.path.join(".")] = e.message;
        });
        setErrors(formatted);
      }
      return false;
    }
  };

  const updateField = (field: keyof RutaFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    form,
    errors,
    validate,
    updateField,
  };
}
