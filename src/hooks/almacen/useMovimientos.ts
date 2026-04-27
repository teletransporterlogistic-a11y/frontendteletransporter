import { useQuery } from "@tanstack/react-query";
import { getMovimientos } from "../../services/almacen.service";
import { AlmacenMovimiento } from "../../types/almacen";

export function useMovimientos(envioId: number) {
  return useQuery<AlmacenMovimiento[]>({
    queryKey: ["almacen-movimientos", envioId],
    queryFn: () => getMovimientos(envioId),
    enabled: !!envioId,
  });
}
