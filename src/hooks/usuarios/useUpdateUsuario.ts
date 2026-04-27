import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUsuario } from "../../services/usuarios.service";
import { Usuario } from "../../types/usuario";

export function useUpdateUsuario(id: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Usuario) => updateUsuario(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["usuario", id] });
      qc.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
}
