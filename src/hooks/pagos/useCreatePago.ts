import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PagoFormData } from "../../validation/pago.schema";
import { createPago } from "../../services/pagos.service";

export function useCreatePago() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PagoFormData) => createPago(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pagos"] });
    },
  });
}
