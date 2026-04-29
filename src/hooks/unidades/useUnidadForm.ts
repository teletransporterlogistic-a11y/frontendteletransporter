import { useState } from "react";
import { unidadSchema, UnidadFormData } from "../../validation/unidad.schema";
import { z } from "zod";

export function useUnidadForm(initial?: Partial<UnidadFormData>) {
  const [form, setForm] = useState<UnidadFormData>({
    unidadId: "",
    nombre: "",
    tipo: "",
    estado: "ACTIVA",
    kmAcumulados: 0,
    rendimientoKmL: 0,
    ultimoServicio: "",
    proximoServicio: "",
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      unidadSchema.parse(form);
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

  const updateField = (field: keyof UnidadFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    form,
    errors,
    validate,
    updateField,
  };
}
