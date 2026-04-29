// src/services/pagos.service.ts

import api from "../api/api";
import { PagoFormData } from "../validation/pago.schema";

// Obtener listado de pagos
export async function getPagos() {
  const { data } = await api.get("/pagos");
  return data;
}

// Obtener un pago por ID
export async function getPagoById(id: number) {
  const { data } = await api.get(`/pagos/${id}`);
  return data;
}

// Crear un pago
export async function createPago(payload: PagoFormData) {
  const { data } = await api.post("/pagos", payload);
  return data;
}

// Actualizar un pago
export async function updatePago(id: number, payload: PagoFormData) {
  const { data } = await api.put(`/pagos/${id}`, payload);
  return data;
}

// Eliminar un pago
export async function deletePago(id: number) {
  const { data } = await api.delete(`/pagos/${id}`);
  return data;
}
