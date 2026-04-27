// src/hooks/clientes/useCliente.ts

import { useQuery } from "@tanstack/react-query";

// ✔ Ruta corregida (tu archivo real es cliente.service.ts)
import { getCliente } from "../../services/clientes.service";

// ✔ Ruta correcta según tu estructura real
import { Cliente } from "../../types/types";

export function useCliente(id: number) {
  return useQuery<Cliente>({
    queryKey: ["cliente", id],
    queryFn: () => getCliente(id),
    enabled: !!id,
  });
}
