import { useQuery } from "@tanstack/react-query";
import { getEnvio } from "../../services/envios.service";
import { Envio } from "../../types/envio";

export function useEnvio(id: number) {
  return useQuery<Envio>({
    queryKey: ["envio", id],
    queryFn: () => getEnvio(id),
    enabled: !!id,
  });
}
