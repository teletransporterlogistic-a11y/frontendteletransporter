import { useMutation, useQueryClient } from "@tanstack/react-query";
import unidadesService from "../../services/unidades.service";
import { Unidad } from "../../types/unidad";

export function useUpdateUnidad(id: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Unidad) => unidadesService.updateUnidad(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["unidad", id] });
      qc.invalidateQueries({ queryKey: ["unidades"] });
    },
  });
}
