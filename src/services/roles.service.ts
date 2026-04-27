// src/services/roles.service.ts

import { Rol } from "../types/rol";

const BASE_URL = "/api/roles";

export async function getRoles(): Promise<Rol[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al obtener roles");
  return res.json();
}

export async function getRol(id: number): Promise<Rol> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Rol no encontrado");
  return res.json();
}

export async function createRol(data: Partial<Rol>): Promise<Rol> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear rol");
  return res.json();
}

export async function updateRol(id: number, data: Partial<Rol>): Promise<Rol> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar rol");
  return res.json();
}

export async function deleteRol(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Error al eliminar rol");
}
