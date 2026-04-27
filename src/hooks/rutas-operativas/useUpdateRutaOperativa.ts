import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RutaOperativaFormData } from "../../validation/rutas-operativas.schema";
import { updateRutaOperativa } from "../../services/rutas-operativas.service";

export function useUpdateRutaOperativa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: RutaOperativaFormData }) =>
      updateRutaOperativa(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutas-operativas"] });
    },
  });
}
