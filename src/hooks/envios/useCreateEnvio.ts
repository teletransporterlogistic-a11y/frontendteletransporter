import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEnvio } from "../../services/envios.service";
import { Envio } from "../../types/envio";

export function useCreateEnvio() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Envio) => createEnvio(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["envios"] });
    },
  });
}
