import { useQuery } from "@tanstack/react-query";
import unidadesService from "../../services/unidades.service";

export function useUnidades(params: {
  page: number;
  pageSize: number;
  search?: string;
  tipo?: string;
  estado?: string;
}) {
  return useQuery({
    queryKey: ["unidades", params],
    queryFn: () => unidadesService.obtenerUnidades(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}
