import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIncidencia } from "../../services/incidencias.service";

export function useDeleteIncidencia() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteIncidencia(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["incidencias"] });
    },
  });
}
