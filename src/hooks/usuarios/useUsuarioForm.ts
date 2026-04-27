import { useState } from "react";
import { usuarioSchema, UsuarioFormData } from "../../validation/usuario.schema";
import { z } from "zod";

export function useUsuarioForm(initial?: Partial<UsuarioFormData>) {
  const [form, setForm] = useState<UsuarioFormData>({
    nombre: "",
    email: "",
    telefono: "",
    rolId: 0,
    password: "",
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      usuarioSchema.parse(form);
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

  const updateField = (field: keyof UsuarioFormData, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return { form, errors, validate, updateField };
}
