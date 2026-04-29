import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PagoFormData } from "../../validation/pago.schema";
import { updatePago } from "../../services/pagos.service";

export function useUpdatePago() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PagoFormData }) =>
      updatePago(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pagos"] });
    },
  });
}
