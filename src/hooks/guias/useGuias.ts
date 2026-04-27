import { useQuery } from "@tanstack/react-query";
import { getGuias, GuiasResponse } from "../../services/guias.service";

export function useGuias(params: {
  page: number;
  pageSize: number;
  search: string;
  estado?: string;
  municipioId?: number;
}) {
  return useQuery<GuiasResponse>({
    queryKey: ["guias", params],
    queryFn: () => getGuias(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}
