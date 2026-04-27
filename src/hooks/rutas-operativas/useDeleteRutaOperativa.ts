import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRutaOperativa } from "../../services/rutas-operativas.service";

export function useDeleteRutaOperativa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteRutaOperativa(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutas-operativas"] });
    },
  });
}
