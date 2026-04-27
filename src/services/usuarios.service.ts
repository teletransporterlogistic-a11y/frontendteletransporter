// src/services/usuarios.service.ts

import { Usuario } from "../types/usuario";

export interface UsuariosResponse {
  data: Usuario[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const BASE_URL = "/api/usuarios";

export async function getUsuarios(params: any): Promise<UsuariosResponse> {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") q.append(k, String(v));
  });

  const res = await fetch(`${BASE_URL}?${q.toString()}`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}

export async function getUsuario(id: number): Promise<Usuario> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Usuario no encontrado");
  return res.json();
}

export async function createUsuario(data: Usuario): Promise<Usuario> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear usuario");
  return res.json();
}

export async function updateUsuario(
  id: number,
  data: Usuario
): Promise<Usuario> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar usuario");
  return res.json();
}

export async function deleteUsuario(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Error al eliminar usuario");
}
