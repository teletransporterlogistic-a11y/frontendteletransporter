import { useQuery } from "@tanstack/react-query";
import { getDashboardIngresosMensuales } from "../../services/dashboard.service";

export function useDashboardIngresosMensuales() {
  return useQuery({
    queryKey: ["dashboard", "ingresos-mensuales"],
    queryFn: getDashboardIngresosMensuales,
  });
}
