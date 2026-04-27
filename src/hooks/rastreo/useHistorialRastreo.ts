import { useQuery } from "@tanstack/react-query";
import { getHistorialRastreo } from "../../services/rastreo.service";
import { RastreoEvento } from "../../types/rastreo";

export function useHistorialRastreo(envioId: number) {
  return useQuery<RastreoEvento[]>({
    queryKey: ["rastreo-historial", envioId],
    queryFn: () => getHistorialRastreo(envioId),
    enabled: !!envioId,
  });
}
