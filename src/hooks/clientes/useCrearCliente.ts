// src/hooks/useCrearCliente.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { ClienteFormData } from "../validation/cliente.schema";

export function useCrearCliente() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (form: ClienteFormData) => {
      console.log("📤 Enviando cliente al backend:", form);

      const res = await api.post("/clientes", {
        tipo: form.tipo,
        nombre: form.nombre,
        rfc: form.rfc || null,
        calle: form.calle,
        numero: form.numero,
        codigoPostal: form.codigoPostal,
        colonias: form.colonias,
        ciudad: form.ciudad,
        estado: form.estado,
        municipio: form.municipio,
        celular: form.celular,
        telefono2: form.telefono2 || null,
        correo: form.correo || null,
        email: form.email || null,
        datosAdicionales: form.datosAdicionales || null,
        descuento: form.descuento,
        requiereFactura: form.requiereFactura,
        retencionIVA: form.retencionIVA,
        activo: form.activo,
        domicilios: form.domicilios,
      });

      return res.data;
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clientes"] });
    },

    onError: (err: any) => {
      console.error("❌ Error al crear cliente:", err);
      alert(`Error al crear cliente: ${err?.message || "Error desconocido"}`);
    },
  });
}
