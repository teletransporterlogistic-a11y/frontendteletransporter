import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOperador } from "../../services/operadores.service";
import { Operador } from "../../types/operador";

export function useUpdateOperador(id: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Operador) => updateOperador(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["operador", id] });
      qc.invalidateQueries({ queryKey: ["operadores"] });
    },
  });
}
