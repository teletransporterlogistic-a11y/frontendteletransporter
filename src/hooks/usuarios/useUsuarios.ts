import { useQuery } from "@tanstack/react-query";
import { getUsuarios, UsuariosResponse } from "../../services/usuarios.service";

export function useUsuarios(params: {
  page: number;
  pageSize: number;
  search?: string;
  rolId?: number;
}) {
  return useQuery<UsuariosResponse>({
    queryKey: ["usuarios", params],
    queryFn: () => getUsuarios(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}
