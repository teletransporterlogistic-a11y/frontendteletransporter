import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOperador } from "../../services/operadores.service";

export function useDeleteOperador() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteOperador(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["operadores"] });
    },
  });
}
