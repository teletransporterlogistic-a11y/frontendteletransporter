import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVehiculo } from "../../services/vehiculos.service";
import { Vehiculo } from "../../types/vehiculo";

export function useUpdateVehiculo(id: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Vehiculo) => updateVehiculo(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vehiculo", id] });
      qc.invalidateQueries({ queryKey: ["vehiculos"] });
    },
  });
}
