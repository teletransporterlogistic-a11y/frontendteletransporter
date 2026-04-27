import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCentroOperativo } from "../../services/centros-operativos.service";

export function useDeleteCentroOperativo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCentroOperativo(id),

    onSuccess: () => {
      // Refrescar listado de centros operativos
      qc.invalidateQueries({ queryKey: ["centros-operativos"] });
    },
  });
}
