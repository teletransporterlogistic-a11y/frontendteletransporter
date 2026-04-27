// src/services/permisos.service.ts

import { Permiso } from "../types/rol";

const BASE_URL = "/api/permisos";

export async function getPermisosByRol(rolId: number): Promise<Permiso[]> {
  const res = await fetch(`${BASE_URL}/rol/${rolId}`);
  if (!res.ok) throw new Error("Error al obtener permisos");
  return res.json();
}

export async function addPermiso(
  rolId: number,
  accion: string
): Promise<Permiso> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rolId, accion }),
  });

  if (!res.ok) throw new Error("Error al agregar permiso");
  return res.json();
}

export async function removePermiso(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Error al eliminar permiso");
}
