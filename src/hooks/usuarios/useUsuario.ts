import { useQuery } from "@tanstack/react-query";
import { getUsuario } from "../../services/usuarios.service";
import { Usuario } from "../../types/usuario";

export function useUsuario(id: number) {
  return useQuery<Usuario>({
    queryKey: ["usuario", id],
    queryFn: () => getUsuario(id),
    enabled: !!id,
  });
}
