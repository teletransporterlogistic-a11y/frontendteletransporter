// src/services/vehiculos.service.ts

import { Vehiculo } from "../types/vehiculo";

export interface VehiculosResponse {
  data: Vehiculo[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const BASE_URL = "/api/vehiculos";

export async function getVehiculos(params: any): Promise<VehiculosResponse> {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") q.append(k, String(v));
  });

  const res = await fetch(`${BASE_URL}?${q.toString()}`);
  if (!res.ok) throw new Error("Error al obtener vehículos");
  return res.json();
}

export async function getVehiculo(id: number): Promise<Vehiculo> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Vehículo no encontrado");
  return res.json();
}

export async function createVehiculo(data: Vehiculo): Promise<Vehiculo> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear vehículo");
  return res.json();
}

export async function updateVehiculo(
  id: number,
  data: Vehiculo
): Promise<Vehiculo> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar vehículo");
  return res.json();
}

export async function deleteVehiculo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Error al eliminar vehículo");
}
