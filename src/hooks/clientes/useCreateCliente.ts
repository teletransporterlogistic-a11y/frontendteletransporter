// src/hooks/useCreateCliente.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

// ✔ Ruta corregida (tu archivo real es cliente.service.ts)
import { createCliente } from "../../services/clientes.service";

// ✔ Ruta correcta según tu estructura real
import { Cliente } from "../../types/types";

export function useCreateCliente() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Cliente) => createCliente(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
}
