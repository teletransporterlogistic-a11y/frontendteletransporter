import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVehiculo } from "../../services/vehiculos.service";

export function useDeleteVehiculo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteVehiculo(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vehiculos"] });
    },
  });
}
