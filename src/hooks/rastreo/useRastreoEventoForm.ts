import { useState } from "react";
import {
  rastreoEventoSchema,
  RastreoEvento,
} from "../../validation/rastreo.schema";
import { z } from "zod";

export function useRastreoEventoForm(initial?: Partial<RastreoEvento>) {
  const [form, setForm] = useState<RastreoEvento>({
    envioId: 0,
    estado: "",
    descripcion: "",
    lat: undefined,
    lng: undefined,
    fecha: new Date().toISOString(),
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      rastreoEventoSchema.parse(form);
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

  const updateField = (field: keyof RastreoEvento, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return { form, errors, validate, updateField };
}
