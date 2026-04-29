import { useQuery } from "@tanstack/react-query";
import {
  getCentrosOperativos,
  CentrosOperativosResponse,
} from "../../services/centros-operativos.service";

export function useCentrosOperativos(params: {
  page: number;
  pageSize: number;
  search?: string;
  ciudad?: string;
  estado?: string;
  activo?: boolean;
}) {
  return useQuery<CentrosOperativosResponse>({
    queryKey: ["centros-operativos", params],
    queryFn: () => getCentrosOperativos(params),
    enabled: !!params.page && !!params.pageSize,
    keepPreviousData: true,
    staleTime: 1000 * 60, // 1 minuto
  });
}
