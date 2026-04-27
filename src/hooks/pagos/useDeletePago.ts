import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePago } from "../../services/pagos.service";

export function useDeletePago() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePago(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pagos"] });
    },
  });
}
