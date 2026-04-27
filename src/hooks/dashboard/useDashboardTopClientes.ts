import { useQuery } from "@tanstack/react-query";
import { getDashboardTopClientes } from "../../services/dashboard.service";

export function useDashboardTopClientes() {
  return useQuery({
    queryKey: ["dashboard", "top-clientes"],
    queryFn: getDashboardTopClientes,
  });
}
