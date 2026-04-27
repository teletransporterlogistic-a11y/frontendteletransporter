import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registrarEventoRastreo } from "../../services/rastreo.service";
import { RastreoEvento } from "../../types/rastreo";

export function useRegistrarEvento() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      envioId: number;
      estado: string;
      lat?: number;
      lng?: number;
      detalle?: string;
    }) => registrarEventoRastreo(data),

    onSuccess: (evento: RastreoEvento) => {
      // Actualizar historial
      qc.invalidateQueries({ queryKey: ["rastreo-historial", evento.envioId] });

      // Actualizar envíos activos (mapa)
      qc.invalidateQueries({ queryKey: ["envios-activos"] });
    },
  });
}
