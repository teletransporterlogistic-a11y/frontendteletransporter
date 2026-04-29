import { useQuery } from "@tanstack/react-query";
import { getIncidencias, IncidenciasResponse } from "../../services/incidencias.service";

export function useIncidencias(params: {
  page: number;
  pageSize: number;
  search?: string;
  envioId?: number;
  operadorId?: number;
  usuarioId?: number;
  tipo?: string;
  estado?: string;
  fechaInicio?: string;
  fechaFin?: string;
}) {
  return useQuery<IncidenciasResponse>({
    queryKey: ["incidencias", params],
    queryFn: () => getIncidencias(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}
