import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCentroOperativo } from "../../services/centros-operativos.service";
import { CentroOperativo } from "../../types/centro-operativo";

export function useUpdateCentroOperativo(id: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CentroOperativo) => updateCentroOperativo(id, data),

    onSuccess: () => {
      // Refrescar el detalle del centro operativo
      qc.invalidateQueries({ queryKey: ["centro-operativo", id] });

      // Refrescar el listado
      qc.invalidateQueries({ queryKey: ["centros-operativos"] });
    },
  });
}
