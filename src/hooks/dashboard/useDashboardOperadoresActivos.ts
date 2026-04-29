import { useQuery } from "@tanstack/react-query";
import { getDashboardOperadoresActivos } from "../../services/dashboard.service";

export function useDashboardOperadoresActivos() {
  return useQuery({
    queryKey: ["dashboard", "operadores-activos"],
    queryFn: getDashboardOperadoresActivos,
  });
}
