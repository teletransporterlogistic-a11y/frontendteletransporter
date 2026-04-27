import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRol } from "../../services/roles.service";

export function useUpdateRol(id: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateRol(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rol", id] });
      qc.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
