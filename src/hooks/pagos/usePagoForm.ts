import { useState } from "react";
import { pagoSchema, PagoFormData } from "../../validation/pago.schema";
import { z } from "zod";

export function usePagoForm(initial?: Partial<PagoFormData>) {
  const [form, setForm] = useState<PagoFormData>({
    envioId: 0,
    monto: 0,
    metodo: "EFECTIVO",
    referencia: "",
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      pagoSchema.parse(form);
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

  const updateField = (field: keyof PagoFormData, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return { form, errors, validate, updateField };
}
