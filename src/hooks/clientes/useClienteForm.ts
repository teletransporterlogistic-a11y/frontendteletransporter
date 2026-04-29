import { useState } from "react";
import { ClienteFormData } from "../../validation/cliente.schema";

export function useClienteForm() {
  const [form, setForm] = useState<ClienteFormData>({
    tipo: "",
    nombre: "",
    rfc: "",
    calle: "",
    numero: "",
    codigoPostal: "",
    colonias: "",
    ciudad: "",
    estado: "",
    municipio: "",
    celular: "",
    telefono2: "",
    correo: "",
    email: "",
    datosAdicionales: "",
    descuento: 0,
    requiereFactura: false,
    retencionIVA: false,
    activo: true,
    domicilios: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateField<K extends keyof ClienteFormData>(
    field: K,
    value: ClienteFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addDomicilio() {
    setForm((prev) => ({
      ...prev,
      domicilios: [
        ...prev.domicilios,
        {
          calle: "",
          numero: "",
          colonia: "",
          codigoPostal: "",
          ciudad: "",
          estado: "",
          municipio: "",
        },
      ],
    }));
  }

  function updateDomicilio(index: number, field: string, value: string) {
    setForm((prev) => {
      const updated = [...prev.domicilios];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, domicilios: updated };
    });
  }

  function removeDomicilio(index: number) {
    setForm((prev) => ({
      ...prev,
      domicilios: prev.domicilios.filter((_, i) => i !== index),
    }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!form.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!form.celular) newErrors.celular = "El celular es obligatorio";
    if (!form.codigoPostal) newErrors.codigoPostal = "El CP es obligatorio";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  return {
    form,
    errors,
    updateField,
    addDomicilio,
    updateDomicilio,
    removeDomicilio,
    validate,
  };
}
