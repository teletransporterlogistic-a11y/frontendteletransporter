import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRol } from "../../services/roles.service";

export function useCreateRol() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createRol,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
