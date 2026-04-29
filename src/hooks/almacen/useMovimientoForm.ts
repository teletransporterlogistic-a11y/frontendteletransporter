import { useState } from "react";
import {
  movimientoSchema,
  MovimientoFormData,
} from "../../validation/almacen.schema";
import { z } from "zod";

export function useMovimientoForm(initial?: Partial<MovimientoFormData>) {
  const [form, setForm] = useState<MovimientoFormData>({
    tipo: "ENTRADA",
    descripcion: "",
    cantidad: 1,
    productoId: 0,
    fecha: new Date().toISOString(),
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      movimientoSchema.parse(form);
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

  const updateField = (field: keyof MovimientoFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return { form, errors, validate, updateField };
}
