// src/services/centros-operativos.service.ts

import { CentroOperativo } from "../types/centro-operativo";

export interface CentrosOperativosResponse {
  data: CentroOperativo[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const BASE_URL = "/api/centros-operativos";

export async function getCentrosOperativos(params: any): Promise<CentrosOperativosResponse> {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") q.append(k, String(v));
  });

  const res = await fetch(`${BASE_URL}?${q.toString()}`);
  if (!res.ok) throw new Error("Error al obtener centros operativos");
  return res.json();
}

export async function getCentroOperativo(id: number): Promise<CentroOperativo> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Centro operativo no encontrado");
  return res.json();
}

export async function createCentroOperativo(data: CentroOperativo): Promise<CentroOperativo> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear centro operativo");
  return res.json();
}

export async function updateCentroOperativo(
  id: number,
  data: CentroOperativo
): Promise<CentroOperativo> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar centro operativo");
  return res.json();
}

export async function deleteCentroOperativo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Error al eliminar centro operativo");
}
