import { useQuery } from "@tanstack/react-query";
import { getOperadores, OperadoresResponse } from "../../services/operadores.service";

export function useOperadores(params: {
  page: number;
  pageSize: number;
  search?: string;
  activo?: boolean;
}) {
  return useQuery<OperadoresResponse>({
    queryKey: ["operadores", params],
    queryFn: () => getOperadores(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}
