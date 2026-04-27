import { useState } from "react";
import {
  centroOperativoSchema,
  CentroOperativoFormData,
} from "../../validation/centro-operativo.schema";
import { z } from "zod";

export function useCentroOperativoForm(initial?: Partial<CentroOperativoFormData>) {
  const [form, setForm] = useState<CentroOperativoFormData>({
    nombre: "",
    clave: "",
    ciudad: "",
    estado: "",
    direccion: "",
    activo: true,
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      centroOperativoSchema.parse(form);
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

  const updateField = (field: keyof CentroOperativoFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    form,
    errors,
    validate,
    updateField,
  };
}
