// src/services/dashboard.service.ts

import api from "../api/api";

export async function getDashboardMetrics() {
  const { data } = await api.get("/dashboard/metrics");
  return data;
}

export async function getGuiasPorMes() {
  const { data } = await api.get("/dashboard/guias-por-mes");
  return data;
}

export async function getEntregasPorZona() {
  const { data } = await api.get("/dashboard/entregas-por-zona");
  return data;
}

export async function getGuiasPorMunicipio() {
  const { data } = await api.get("/dashboard/guias-por-municipio");
  return data;
}
