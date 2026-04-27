// src/services/almacen.service.ts

import { AlmacenInventario, AlmacenMovimiento } from "../types/almacen";

// Obtener inventario del almacén
export async function getInventario(
  centroOperativoId?: number
): Promise<AlmacenInventario[]> {
  const q = centroOperativoId ? `?centroOperativoId=${centroOperativoId}` : "";
  const res = await fetch(`/api/almacen/inventario${q}`);

  if (!res.ok) throw new Error("Error al obtener inventario");
  return res.json();
}

// Obtener historial de movimientos de un envío
export async function getMovimientos(
  envioId: number
): Promise<AlmacenMovimiento[]> {
  const res = await fetch(`/api/almacen/movimientos/${envioId}`);

  if (!res.ok) throw new Error("Error al obtener movimientos");
  return res.json();
}

// Registrar movimiento (app móvil o dashboard)
export async function registrarMovimiento(data: {
  envioId: number;
  tipo: string;
  detalle?: string;
  operadorId?: number;
  lat?: number;
  lng?: number;
}): Promise<AlmacenMovimiento> {
  const res = await fetch(`/api/almacen/movimiento`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al registrar movimiento");
  return res.json();
}
