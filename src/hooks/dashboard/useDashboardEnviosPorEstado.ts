import { useQuery } from "@tanstack/react-query";
import { getDashboardEnviosPorEstado } from "../../services/dashboard.service";

export function useDashboardEnviosPorEstado() {
  return useQuery({
    queryKey: ["dashboard", "envios-por-estado"],
    queryFn: getDashboardEnviosPorEstado,
  });
}
