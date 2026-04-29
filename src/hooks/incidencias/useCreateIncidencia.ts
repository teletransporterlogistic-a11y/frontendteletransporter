import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIncidencia } from "../../services/incidencias.service";
import { Incidencia } from "../../types/incidencia";

export function useCreateIncidencia() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Incidencia) => createIncidencia(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["incidencias"] });
    },
  });
}
