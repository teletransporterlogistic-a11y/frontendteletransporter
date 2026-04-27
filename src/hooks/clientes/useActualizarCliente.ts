// src/hooks/useActualizarCliente.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

// ✔ Ruta correcta según tu estructura real
import { actualizarCliente } from "../services/clientes.service";

// ✔ Ruta correcta según tu estructura real
import { Cliente } from "../types/types";

export function useActualizarCliente(id: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Cliente) => actualizarCliente(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cliente", id] });
      qc.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
}
