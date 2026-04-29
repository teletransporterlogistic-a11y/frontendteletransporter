import { useState } from "react";
import { operadorSchema, OperadorFormData } from "../../validation/operador.schema";
import { z } from "zod";

export function useOperadorForm(initial?: Partial<OperadorFormData>) {
  const [form, setForm] = useState<OperadorFormData>({
    nombre: "",
    telefono: "",
    licencia: "",
    centroOperativoId: 0,
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      operadorSchema.parse(form);
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

  const updateField = (field: keyof OperadorFormData, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return { form, errors, validate, updateField };
}
