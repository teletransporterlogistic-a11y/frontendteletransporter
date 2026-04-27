// src/services/envios.service.ts

import { Envio } from "../types/envio";

export interface EnviosResponse {
  data: Envio[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const BASE_URL = "/api/envios";

/* ============================================================
   LISTAR ENVÍOS
============================================================ */
export async function getEnvios(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  clienteId?: number;
  operadorId?: number;
  estadoActualId?: number;
  ciudadDestino?: string;
}): Promise<EnviosResponse> {
  const q = new URLSearchParams();

  if (params.page) q.append("page", String(params.page));
  if (params.pageSize) q.append("pageSize", String(params.pageSize));
  if (params.search) q.append("search", params.search);
  if (params.clienteId) q.append("clienteId", String(params.clienteId));
  if (params.operadorId) q.append("operadorId", String(params.operadorId));
  if (params.estadoActualId) q.append("estadoActualId", String(params.estadoActualId));
  if (params.ciudadDestino) q.append("ciudadDestino", params.ciudadDestino);

  const res = await fetch(`${BASE_URL}?${q.toString()}`);
  if (!res.ok) throw new Error("Error al obtener envíos");
  return res.json();
}

/* ============================================================
   OBTENER ENVÍO POR ID
============================================================ */
export async function getEnvio(id: number): Promise<Envio> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Envío no encontrado");
  return res.json();
}

/* Alias requerido por DescargaPage y ModificacionEstadoPage */
export async function getEnvioById(id: number): Promise<Envio> {
  return getEnvio(id);
}

/* ============================================================
   CREAR ENVÍO
============================================================ */
export async function createEnvio(data: Envio): Promise<Envio> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear envío");
  return res.json();
}

/* ============================================================
   ACTUALIZAR ENVÍO COMPLETO
============================================================ */
export async function updateEnvio(id: number, data: Envio): Promise<Envio> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar envío");
  return res.json();
}

/* ============================================================
   ELIMINAR ENVÍO
============================================================ */
export async function deleteEnvio(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Error al eliminar envío");
}

/* ============================================================
   REGISTRAR DESCARGA EN ALMACÉN
============================================================ */
export async function registrarDescarga(id: number, payload: any): Promise<any> {
  const res = await fetch(`${BASE_URL}/${id}/descarga`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Error al registrar descarga");
  return res.json();
}

/* ============================================================
   ACTUALIZAR ESTADO DEL ENVÍO
============================================================ */
export async function actualizarEstadoEnvio(
  id: number,
  estadoActualId: number
): Promise<Envio> {
  const res = await fetch(`${BASE_URL}/${id}/estado`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estadoActualId }),
  });

  if (!res.ok) throw new Error("Error al actualizar estado del envío");
  return res.json();
}
