import { useQuery } from "@tanstack/react-query";
import { getDashboardEnviosPorDia } from "../../services/dashboard.service";

export function useDashboardEnviosPorDia() {
  return useQuery({
    queryKey: ["dashboard", "envios-por-dia"],
    queryFn: getDashboardEnviosPorDia,
  });
}
