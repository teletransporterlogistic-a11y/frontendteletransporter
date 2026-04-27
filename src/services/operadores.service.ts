// src/services/operadores.service.ts

import { Operador } from "../types/operador";

export interface OperadoresResponse {
  data: Operador[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const BASE_URL = "/api/operadores";

export async function getOperadores(params: any): Promise<OperadoresResponse> {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") q.append(k, String(v));
  });

  const res = await fetch(`${BASE_URL}?${q.toString()}`);
  if (!res.ok) throw new Error("Error al obtener operadores");
  return res.json();
}

export async function getOperador(id: number): Promise<Operador> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Operador no encontrado");
  return res.json();
}

export async function createOperador(data: Operador): Promise<Operador> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear operador");
  return res.json();
}

export async function updateOperador(
  id: number,
  data: Operador
): Promise<Operador> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar operador");
  return res.json();
}

export async function deleteOperador(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Error al eliminar operador");
}
