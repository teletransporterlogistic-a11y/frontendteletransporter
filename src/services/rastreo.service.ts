// src/services/rastreo.service.ts

import { RastreoEvento } from "../types/rastreo";

// Obtener historial completo del envío
export async function getHistorialRastreo(envioId: number): Promise<RastreoEvento[]> {
  const res = await fetch(`/api/rastreo/envio/${envioId}`);
  if (!res.ok) throw new Error("Error al obtener historial");
  return res.json();
}

// Registrar un evento de rastreo
export async function registrarEventoRastreo(data: {
  envioId: number;
  estado: string;
  lat?: number;
  lng?: number;
  detalle?: string;
}): Promise<RastreoEvento> {
  const res = await fetch(`/api/rastreo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al registrar evento");
  return res.json();
}

// Obtener envíos activos con filtros (para mapa)
export async function getEnviosActivos(params: {
  unidadId?: number;
  rutaId?: number;
  centroOperativoId?: number;
}) {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      q.append(k, String(v));
    }
  });

  const res = await fetch(`/api/rastreo/activos?${q.toString()}`);
  if (!res.ok) throw new Error("Error al obtener envíos activos");

  return res.json();
}
