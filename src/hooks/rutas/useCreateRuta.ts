import { useMutation } from "@tanstack/react-query";
import { RutaFormData } from "../../validation/ruta.schema";
import { createRuta } from "../../services/rutas.service";

export function useCreateRuta() {
  return useMutation({
    mutationFn: async (data: RutaFormData) => {
      return await createRuta(data);
    },
  });
}
