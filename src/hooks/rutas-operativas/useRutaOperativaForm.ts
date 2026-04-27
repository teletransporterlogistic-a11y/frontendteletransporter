import { useState } from "react";
import {
  rutaOperativaSchema,
  RutaOperativaFormData,
} from "../../validation/rutas-operativas.schema";
import { z } from "zod";

export function useRutaOperativaForm(initial?: Partial<RutaOperativaFormData>) {
  const [form, setForm] = useState<RutaOperativaFormData>({
    nombre: "",
    operadorId: 0,
    puntos: [],
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      rutaOperativaSchema.parse(form);
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

  const updateField = (field: keyof RutaOperativaFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addPunto = (lat: number, lng: number) => {
    setForm((prev) => ({
      ...prev,
      puntos: [
        ...prev.puntos,
        { lat, lng, orden: prev.puntos.length + 1 },
      ],
    }));
  };

  const removePunto = (orden: number) => {
    setForm((prev) => ({
      ...prev,
      puntos: prev.puntos
        .filter((p) => p.orden !== orden)
        .map((p, i) => ({ ...p, orden: i + 1 })),
    }));
  };

  return {
    form,
    errors,
    validate,
    updateField,
    addPunto,
    removePunto,
  };
}
