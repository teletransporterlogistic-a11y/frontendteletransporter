import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUsuario } from "../../services/usuarios.service";

export function useDeleteUsuario() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUsuario(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
}
