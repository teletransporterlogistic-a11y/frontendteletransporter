import { useState } from "react";
import { rolSchema, RolFormData } from "../../validation/rol.schema";
import { z } from "zod";

export function useRolForm(initial?: Partial<RolFormData>) {
  const [form, setForm] = useState<RolFormData>({
    nombre: "",
    tenant: "default",
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      rolSchema.parse(form);
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

  const updateField = (field: keyof RolFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return { form, errors, validate, updateField };
}
