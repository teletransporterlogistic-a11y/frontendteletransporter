import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuia } from "../../services/guias.service";
import { Guia } from "../../types/guia";

export function useCreateGuia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Guia) => createGuia(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["guias"] });
    },
  });
}
