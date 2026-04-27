import { useState } from "react";
import { incidenciaSchema, IncidenciaFormData } from "../../validation/incidencia.schema";
import { z } from "zod";

export function useIncidenciaForm(initial?: Partial<IncidenciaFormData>) {
  const [form, setForm] = useState<IncidenciaFormData>({
    envioId: 0,
    operadorId: undefined,
    tipo: "",
    descripcion: "",
    evidenciaUrl: "",
    lat: undefined,
    lng: undefined,
    estado: "ABIERTA",
    usuarioId: undefined,
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      incidenciaSchema.parse(form);
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

  const updateField = (field: keyof IncidenciaFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    form,
    errors,
    validate,
    updateField,
  };
}
