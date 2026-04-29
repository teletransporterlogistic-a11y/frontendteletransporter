import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVehiculo } from "../../services/vehiculos.service";
import { Vehiculo } from "../../types/vehiculo";

export function useCreateVehiculo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Vehiculo) => createVehiculo(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vehiculos"] });
    },
  });
}
