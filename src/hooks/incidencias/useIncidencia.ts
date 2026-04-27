import { useQuery } from "@tanstack/react-query";
import { getIncidencia } from "../../services/incidencias.service";
import { Incidencia } from "../../types/incidencia";

export function useIncidencia(id: number) {
  return useQuery<Incidencia>({
    queryKey: ["incidencia", id],
    queryFn: () => getIncidencia(id),
    enabled: !!id,
  });
}
