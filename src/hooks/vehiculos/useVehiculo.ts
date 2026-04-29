import { useQuery } from "@tanstack/react-query";
import { getVehiculo } from "../../services/vehiculos.service";
import { Vehiculo } from "../../types/vehiculo";

export function useVehiculo(id: number) {
  return useQuery<Vehiculo>({
    queryKey: ["vehiculo", id],
    queryFn: () => getVehiculo(id),
    enabled: !!id,
  });
}
