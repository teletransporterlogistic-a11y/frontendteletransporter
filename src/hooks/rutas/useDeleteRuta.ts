import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRuta } from "../../services/rutas.service";

export function useDeleteRuta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteRuta(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutas"] });
    },
  });
}
