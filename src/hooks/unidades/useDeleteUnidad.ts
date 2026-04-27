import { useMutation, useQueryClient } from "@tanstack/react-query";
import unidadesService from "../../services/unidades.service";

export function useDeleteUnidad() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => unidadesService.deleteUnidad(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["unidades"] });
    },
  });
}
