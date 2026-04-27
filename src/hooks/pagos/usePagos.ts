import { useQuery } from "@tanstack/react-query";
import { getPagos } from "../../services/pagos.service";

export function usePagos() {
  return useQuery({
    queryKey: ["pagos"],
    queryFn: getPagos,
  });
}
