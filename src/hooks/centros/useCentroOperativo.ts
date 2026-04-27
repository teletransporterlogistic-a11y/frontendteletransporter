import { useQuery } from "@tanstack/react-query";
import { getCentroOperativo } from "../../services/centros-operativos.service";
import { CentroOperativo } from "../../types/centro-operativo";

export function useCentroOperativo(id: number) {
  return useQuery<CentroOperativo>({
    queryKey: ["centro-operativo", id],
    queryFn: () => getCentroOperativo(id),
    enabled: !!id,
  });
}
