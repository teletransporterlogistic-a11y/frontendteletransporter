import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGuia } from "../../services/guias.service";
import { Guia } from "../../types/guia";

export function useUpdateGuia(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Guia) => updateGuia(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["guia", id] });
      qc.invalidateQueries({ queryKey: ["guias"] });
    },
  });
}
