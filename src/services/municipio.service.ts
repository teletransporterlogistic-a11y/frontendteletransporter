// src/services/municipio.service.ts

import { Municipio } from "../types/types";

const BASE_URL = "/api/municipios";

export async function getMunicipios(): Promise<Municipio[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al obtener municipios");
  return res.json();
}

export async function getMunicipio(id: number): Promise<Municipio> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Municipio no encontrado");
  return res.json();
}

export async function buscarMunicipiosPorCP(cp: string): Promise<Municipio[]> {
  const res = await fetch(`${BASE_URL}?codigoPostal=${cp}`);
  if (!res.ok) throw new Error("Error al buscar municipios por CP");
  return res.json();
}
