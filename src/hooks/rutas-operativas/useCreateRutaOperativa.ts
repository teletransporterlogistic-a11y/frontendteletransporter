import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RutaOperativaFormData } from "../../validation/rutas-operativas.schema";
import { createRutaOperativa } from "../../services/rutas-operativas.service";

export function useCreateRutaOperativa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RutaOperativaFormData) => createRutaOperativa(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutas-operativas"] });
    },
  });
}
