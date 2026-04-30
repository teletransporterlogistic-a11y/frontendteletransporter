// src/services/cliente.service.ts
import api from "../api/api";
import { ClienteFormData } from "../validation/cliente.schema";
import { Cliente } from "../types/types";

// ===============================
// Tipos de respuesta
// ===============================
export interface ClientesResponse {
  data: Cliente[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ===============================
// LISTAR CLIENTES
// ===============================
export async function getClientes(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  activo?: boolean;
}): Promise<ClientesResponse> {
  const res = await api.get("/clientes", params);
  return res as ClientesResponse;
}

// ===============================
// OBTENER CLIENTE POR ID
// ===============================
export async function getCliente(id: number): Promise<Cliente> {
  const res = await api.get(`/clientes/${id}`);
  return res as Cliente;
}

// ===============================
// CREAR CLIENTE
// ===============================
export async function createCliente(data: ClienteFormData): Promise<Cliente> {
  console.log("📤 Enviando cliente al backend:", data);

  const res = await api.post("/clientes", data);
  return res as Cliente;
}

// ===============================
// ACTUALIZAR CLIENTE
// ===============================
export async function updateCliente(
  id: number,
  data: ClienteFormData
): Promise<Cliente> {
  const res = await api.put(`/clientes/${id}`, data);
  return res as Cliente;
}

// ===============================
// ELIMINAR CLIENTE
// ===============================
export async function deleteCliente(id: number): Promise<void> {
  await api.delete(`/clientes/${id}`);
}
