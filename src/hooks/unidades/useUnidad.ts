import { useQuery } from "@tanstack/react-query";
import unidadesService from "../../services/unidades.service";
import { Unidad } from "../../types/unidad";

export function useUnidad(id: number) {
  return useQuery<Unidad>({
    queryKey: ["unidad", id],
    queryFn: () => unidadesService.getUnidad(id),
    enabled: !!id,
  });
}
