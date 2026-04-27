// src/hooks/useDashboard.ts
import { useQuery } from "@tanstack/react-query";
import {
  getDashboardMetrics,
  getGuiasPorMes,
  getEntregasPorZona,
  getGuiasPorMunicipio,
  DashboardMetrics,
  GuiasPorMes,
  EntregasPorZona,
  GuiasPorMunicipio,
} from "../../services/dashboard.service";

export function useDashboardMetrics() {
  return useQuery<DashboardMetrics>({
    queryKey: ["dashboard", "metrics"],
    queryFn: getDashboardMetrics,
    staleTime: 1000 * 60,
  });
}

export function useGuiasPorMes() {
  return useQuery<GuiasPorMes[]>({
    queryKey: ["dashboard", "guias-por-mes"],
    queryFn: getGuiasPorMes,
    staleTime: 1000 * 60,
  });
}

export function useEntregasPorZona() {
  return useQuery<EntregasPorZona[]>({
    queryKey: ["dashboard", "entregas-por-zona"],
    queryFn: getEntregasPorZona,
    staleTime: 1000 * 60,
  });
}

export function useGuiasPorMunicipio() {
  return useQuery<GuiasPorMunicipio[]>({
    queryKey: ["dashboard", "guias-por-municipio"],
    queryFn: getGuiasPorMunicipio,
    staleTime: 1000 * 60,
  });
}
