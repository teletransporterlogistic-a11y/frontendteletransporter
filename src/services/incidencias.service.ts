// src/services/incidencias.service.ts

import { Incidencia } from "../types/incidencia";

export interface IncidenciasResponse {
  data: Incidencia[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const BASE_URL = "/api/incidencias";

export async function getIncidencias(params: any): Promise<IncidenciasResponse> {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") q.append(k, String(v));
  });

  const res = await fetch(`${BASE_URL}?${q.toString()}`);
  if (!res.ok) throw new Error("Error al obtener incidencias");
  return res.json();
}

export async function getIncidencia(id: number): Promise<Incidencia> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Incidencia no encontrada");
  return res.json();
}

export async function createIncidencia(data: Incidencia): Promise<Incidencia> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear incidencia");
  return res.json();
}

export async function updateIncidencia(
  id: number,
  data: Incidencia
): Promise<Incidencia> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar incidencia");
  return res.json();
}

export async function deleteIncidencia(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Error al eliminar incidencia");
}
