// src/hooks/clientes/useClientes.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ✔ Ruta correcta según tu estructura real
import {
  getClientes,
  getCliente,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../../services/clientes.service";

// ✔ Ruta correcta según tu estructura real
import { ClienteFormData } from "../../validation/cliente.schema";

// ===============================
// LISTAR CLIENTES (con paginación y filtros)
// ===============================
export function useClientes(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  activo?: boolean;
}) {
  return useQuery({
    queryKey: ["clientes", params],
    queryFn: () => getClientes(params),
    keepPreviousData: true,
  });
}

// ===============================
// OBTENER CLIENTE POR ID
// ===============================
export function useCliente(id?: number) {
  return useQuery({
    queryKey: ["cliente", id],
    queryFn: () => getCliente(id!),
    enabled: !!id,
  });
}

// ===============================
// CREAR CLIENTE
// ===============================
export function useCrearCliente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClienteFormData) => createCliente(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
}

// ===============================
// ACTUALIZAR CLIENTE
// ===============================
export function useActualizarCliente(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClienteFormData) => updateCliente(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      queryClient.invalidateQueries({ queryKey: ["cliente", id] });
    },
  });
}

// ===============================
// ELIMINAR CLIENTE
// ===============================
export function useEliminarCliente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCliente(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
}
