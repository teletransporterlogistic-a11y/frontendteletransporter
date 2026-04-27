// src/hooks/useUpdateCliente.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

// ✔ Ruta corregida (tu archivo real es cliente.service.ts)
import { updateCliente } from "../../services/clientes.service";

// ✔ Ruta correcta según tu estructura real
import { Cliente } from "../../types/types";

export function useUpdateCliente(id: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Cliente) => updateCliente(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cliente", id] });
      qc.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
}
