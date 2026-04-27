import { useMutation, useQueryClient } from "@tanstack/react-query";
import unidadesService from "../../services/unidades.service";
import { Unidad } from "../../types/unidad";

export function useCreateUnidad() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Unidad) => unidadesService.createUnidad(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["unidades"] });
    },
  });
}
