import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOperador } from "../../services/operadores.service";
import { Operador } from "../../types/operador";

export function useCreateOperador() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Operador) => createOperador(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["operadores"] });
    },
  });
}
