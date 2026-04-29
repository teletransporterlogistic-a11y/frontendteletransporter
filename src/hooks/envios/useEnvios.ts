import { useQuery } from "@tanstack/react-query";
import { getEnvios, EnviosResponse } from "../../services/envios.service";

export function useEnvios(params: {
  page: number;
  pageSize: number;
  search: string;
  clienteId?: number;
  operadorId?: number;
  estadoActualId?: number;
  ciudadDestino?: string;
}) {
  return useQuery<EnviosResponse>({
    queryKey: ["envios", params],
    queryFn: () => getEnvios(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}
