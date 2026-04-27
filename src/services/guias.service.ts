// src/services/guias.service.ts

import { Guia } from "../types/guia";

export interface GuiasResponse {
  data: Guia[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const BASE_URL = "/api/guias";

export async function getGuias(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  estado?: string;
  municipioId?: number;
}): Promise<GuiasResponse> {
  const q = new URLSearchParams();

  if (params.page) q.append("page", String(params.page));
  if (params.pageSize) q.append("pageSize", String(params.pageSize));
  if (params.search) q.append("search", params.search);
  if (params.estado) q.append("estado", params.estado);
  if (params.municipioId) q.append("municipioId", String(params.municipioId));

  const res = await fetch(`${BASE_URL}?${q.toString()}`);
  if (!res.ok) throw new Error("Error al obtener guías");
  return res.json();
}

export async function getGuia(id: number): Promise<Guia> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Guía no encontrada");
  return res.json();
}

export async function createGuia(data: Guia): Promise<Guia> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear guía");
  return res.json();
}

export async function updateGuia(id: number, data: Guia): Promise<Guia> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar guía");
  return res.json();
}

export async function deleteGuia(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Error al eliminar guía");
}
