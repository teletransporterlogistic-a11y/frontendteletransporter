// src/services/domicilio.service.ts

import { Domicilio } from "../types/types";

const BASE_URL = "/api/domicilios";

export async function crearDomicilio(data: Domicilio): Promise<Domicilio> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear domicilio");
  return res.json();
}

export async function actualizarDomicilio(
  id: number,
  data: Domicilio
): Promise<Domicilio> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar domicilio");
  return res.json();
}

export async function eliminarDomicilio(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Error al eliminar domicilio");
}
