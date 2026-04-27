import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUsuario } from "../../services/usuarios.service";
import { Usuario } from "../../types/usuario";

export function useCreateUsuario() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Usuario) => createUsuario(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
}
