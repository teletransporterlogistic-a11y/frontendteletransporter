import { useState } from "react";
import { vehiculoSchema, VehiculoFormData } from "../../validation/vehiculo.schema";
import { z } from "zod";

export function useVehiculoForm(initial?: Partial<VehiculoFormData>) {
  const [form, setForm] = useState<VehiculoFormData>({
    placas: "",
    marca: "",
    modelo: "",
    capacidad: 0,
    operadorId: undefined,
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      vehiculoSchema.parse(form);
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

  const updateField = (field: keyof VehiculoFormData, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return { form, errors, validate, updateField };
}
