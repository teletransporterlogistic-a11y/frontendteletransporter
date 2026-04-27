import { useQuery } from "@tanstack/react-query";
import { getPagoById } from "../../services/pagos.service";

export function usePago(id: number) {
  return useQuery({
    queryKey: ["pago", id],
    queryFn: () => getPagoById(id),
    enabled: !!id,
  });
}
