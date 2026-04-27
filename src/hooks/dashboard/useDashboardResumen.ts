import { useQuery } from "@tanstack/react-query";
import { getDashboardResumen } from "../../services/dashboard.service";

export function useDashboardResumen() {
  return useQuery({
    queryKey: ["dashboard", "resumen"],
    queryFn: getDashboardResumen,
  });
}
