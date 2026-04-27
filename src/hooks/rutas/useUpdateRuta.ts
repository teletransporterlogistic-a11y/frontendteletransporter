import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRuta } from "../../services/rutas.service";
import { RutaFormData } from "../../validation/ruta.schema";

export function useUpdateRuta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: RutaFormData }) =>
      updateRuta(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutas"] });
    },
  });
}
