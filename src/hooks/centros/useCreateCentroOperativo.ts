import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCentroOperativo } from "../../services/centros-operativos.service";
import { CentroOperativo } from "../../types/centro-operativo";

export function useCreateCentroOperativo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CentroOperativo) => createCentroOperativo(data),

    onSuccess: () => {
      // Refrescar listado de centros operativos
      qc.invalidateQueries({ queryKey: ["centros-operativos"] });
    },
  });
}
