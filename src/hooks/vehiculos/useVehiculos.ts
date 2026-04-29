import { useQuery } from "@tanstack/react-query";
import { getVehiculos, VehiculosResponse } from "../../services/vehiculos.service";

export function useVehiculos(params: {
  page: number;
  pageSize: number;
  search?: string;
  tipo?: string;
  estado?: string;
  operadorId?: number;
  centroOperativoId?: number;
}) {
  return useQuery<VehiculosResponse>({
    queryKey: ["vehiculos", params],
    queryFn: () => getVehiculos(params),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}
