import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIncidencia } from "../../services/incidencias.service";
import { Incidencia } from "../../types/incidencia";

export function useUpdateIncidencia(id: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Incidencia) => updateIncidencia(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["incidencia", id] });
      qc.invalidateQueries({ queryKey: ["incidencias"] });
    },
  });
}
