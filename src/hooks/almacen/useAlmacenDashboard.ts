import { useQuery } from "@tanstack/react-query";
import {
  getAlmacenKPIs,
  getProductividadOperadores,
  getAlmacenHeatmap,
} from "../../services/almacenDashboard.service";
import {
  AlmacenKPI,
  OperadorProductividad,
  HeatmapPunto,
} from "../../types/almacenDashboard";

export function useAlmacenKPIs(centroOperativoId?: number) {
  return useQuery<AlmacenKPI>({
    queryKey: ["almacen-kpis", centroOperativoId],
    queryFn: () => getAlmacenKPIs(centroOperativoId),
    enabled: !!centroOperativoId,
    refetchInterval: 10000,
  });
}

export function useProductividadOperadores(centroOperativoId?: number) {
  return useQuery<OperadorProductividad[]>({
    queryKey: ["almacen-operadores", centroOperativoId],
    queryFn: () => getProductividadOperadores(centroOperativoId),
    enabled: !!centroOperativoId,
    refetchInterval: 15000,
  });
}

export function useAlmacenHeatmap(centroOperativoId?: number) {
  return useQuery<HeatmapPunto[]>({
    queryKey: ["almacen-heatmap", centroOperativoId],
    queryFn: () => getAlmacenHeatmap(centroOperativoId),
    enabled: !!centroOperativoId,
    refetchInterval: 20000,
  });
}
