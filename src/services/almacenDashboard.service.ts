// src/services/almacenDashboard.service.ts

import {
  AlmacenKPI,
  OperadorProductividad,
  HeatmapPunto,
} from "../types/almacenDashboard";

export async function getAlmacenKPIs(
  centroOperativoId?: number
): Promise<AlmacenKPI> {
  const q = centroOperativoId ? `?centroOperativoId=${centroOperativoId}` : "";
  const res = await fetch(`/api/almacen/dashboard/kpis${q}`);

  if (!res.ok) throw new Error("Error al obtener KPIs de almacén");
  return res.json();
}

export async function getProductividadOperadores(
  centroOperativoId?: number
): Promise<OperadorProductividad[]> {
  const q = centroOperativoId ? `?centroOperativoId=${centroOperativoId}` : "";
  const res = await fetch(`/api/almacen/dashboard/operadores${q}`);

  if (!res.ok) throw new Error("Error al obtener productividad de operadores");
  return res.json();
}

export async function getAlmacenHeatmap(
  centroOperativoId?: number
): Promise<HeatmapPunto[]> {
  const q = centroOperativoId ? `?centroOperativoId=${centroOperativoId}` : "";
  const res = await fetch(`/api/almacen/dashboard/heatmap${q}`);

  if (!res.ok) throw new Error("Error al obtener heatmap de almacén");
  return res.json();
}
