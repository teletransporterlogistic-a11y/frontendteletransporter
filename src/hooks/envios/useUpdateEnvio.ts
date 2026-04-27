import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEnvio } from "../../services/envios.service";
import { Envio } from "../../types/envio";

export function useUpdateEnvio(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Envio) => updateEnvio(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["envio", id] });
      qc.invalidateQueries({ queryKey: ["envios"] });
    },
  });
}
