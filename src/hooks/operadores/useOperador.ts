import { useQuery } from "@tanstack/react-query";
import { getOperador } from "../../services/operadores.service";
import { Operador } from "../../types/operador";

export function useOperador(id: number) {
  return useQuery<Operador>({
    queryKey: ["operador", id],
    queryFn: () => getOperador(id),
    enabled: !!id,
  });
}
