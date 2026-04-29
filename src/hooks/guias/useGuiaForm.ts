import { useState, useEffect } from "react";
import { guiaSchema, GuiaFormData } from "../../validation/guia.schema";
import { z } from "zod";

export function useGuiaForm(initial?: Partial<GuiaFormData>) {
  const [form, setForm] = useState<GuiaFormData>({
    codigo: "",
    municipioId: 0,
    peso: 0,
    largo: 0,
    ancho: 0,
    alto: 0,
    peso_predominante: 0,
    costo: 0,
    estado: "PENDIENTE",
    remitente_nombre: "",
    remitente_telefono: "",
    remitente_direccion: "",
    destinatario_nombre: "",
    destinatario_telefono: "",
    destinatario_direccion: "",
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cálculo automático de peso volumétrico y predominante
  useEffect(() => {
    const volumetrico = (form.largo * form.ancho * form.alto) / 5000;
    const predominante = Math.max(form.peso, volumetrico);

    setForm((prev) => ({
      ...prev,
      peso_predominante: Number(predominante.toFixed(2)),
    }));
  }, [form.peso, form.largo, form.ancho, form.alto]);

  // Cálculo automático de costo
  useEffect(() => {
    const costo = form.peso_predominante * 12; // tarifa base
    setForm((prev) => ({ ...prev, costo: Number(costo.toFixed(2)) }));
  }, [form.peso_predominante]);

  const validate = () => {
    try {
      guiaSchema.parse(form);
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

  const updateField = (field: keyof GuiaFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    form,
    errors,
    validate,
    updateField,
  };
}
