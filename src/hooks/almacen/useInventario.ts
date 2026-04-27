import { useQuery } from "@tanstack/react-query";
import { getInventario } from "../../services/almacen.service";
import { AlmacenInventario } from "../../types/almacen";

export function useInventario(centroOperativoId?: number) {
  return useQuery<AlmacenInventario[]>({
    queryKey: ["almacen-inventario", centroOperativoId],
    queryFn: () => getInventario(centroOperativoId),
    enabled: !!centroOperativoId,
    refetchInterval: 5000, // refresco automático
  });
}
