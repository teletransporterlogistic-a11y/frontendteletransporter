import { useQuery } from "@tanstack/react-query";
import { getRutaOperativaById } from "../../services/rutas-operativas.service";

export function useRutaOperativa(id: number) {
  return useQuery({
    queryKey: ["ruta-operativa", id],
    queryFn: () => getRutaOperativaById(id),
    enabled: !!id,
  });
}
