import { useQuery } from "@tanstack/react-query";
import { getGuia } from "../../services/guias.service";
import { Guia } from "../../types/guia";

export function useGuia(id: number) {
  return useQuery<Guia>({
    queryKey: ["guia", id],
    queryFn: () => getGuia(id),
    enabled: !!id,
  });
}
