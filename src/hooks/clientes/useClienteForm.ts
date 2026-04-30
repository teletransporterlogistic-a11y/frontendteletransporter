import { useState } from "react";
import { ClienteFormData, domicilioSchema } from "@/validation/cliente.schema";

// Tipo del domicilio adicional
type Domicilio = typeof domicilioSchema._type;

export function useClienteForm() {
  const [form, setForm] = useState<ClienteFormData>({
    tipo: "",
    nombre: "",
    rfc: "",
    calle: "",
    numero: "",
    codigoPostal: "",
    colonias: "",        // ✔ ahora string (correcto para <select>)
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
    domicilios: [],      // ✔ array tipado
    municipioId: null,   // ✔ agregado si tu backend lo usa
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ===============================
  // Actualizar campo simple
  // ===============================
  function updateField<K extends keyof ClienteFormData>(
    field: K,
    value: ClienteFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // ===============================
  // Agregar domicilio adicional
  // ===============================
  function addDomicilio() {
    const empty: Domicilio = {
      calle: "",
      numero: "",
      colonia: "",
      codigoPostal: "",
      ciudad: "",
      estado: "",
      municipio: "",
    };

    setForm((prev) => ({
      ...prev,
      domicilios: [...prev.domicilios, empty],
    }));
  }

  // ===============================
  // Actualizar domicilio adicional
  // ===============================
  function updateDomicilio<K extends keyof Domicilio>(
    index: number,
    field: K,
    value: Domicilio[K]
  ) {
    setForm((prev) => {
      const updated = [...prev.domicilios];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, domicilios: updated };
    });
  }

  // ===============================
  // Eliminar domicilio adicional
  // ===============================
  function removeDomicilio(index: number) {
    setForm((prev) => ({
      ...prev,
      domicilios: prev.domicilios.filter((_, i) => i !== index),
    }));
  }

  // ===============================
  // Validación mínima (UI)
  // ===============================
  function validate() {
    const newErrors: Record<string, string> = {};

    if (!form.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!form.celular) newErrors.celular = "El celular es obligatorio";
    if (!form.codigoPostal) newErrors.codigoPostal = "El CP es obligatorio";

    // ✔ CORREGIDO: antes revisaba form.colonia (campo inexistente)
    if (!form.colonias) newErrors.colonias = "La colonia es obligatoria";

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
