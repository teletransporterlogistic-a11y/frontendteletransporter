import { useQuery } from "@tanstack/react-query";
import { getRutaById } from "../../services/rutas.service";

export function useRuta(id: number) {
  return useQuery({
    queryKey: ["ruta", id],
    queryFn: () => getRutaById(id),
    enabled: !!id,
  });
}
