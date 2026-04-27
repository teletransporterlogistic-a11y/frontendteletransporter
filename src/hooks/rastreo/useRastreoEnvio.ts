import { useHistorialRastreo } from "./useHistorialRastreo";
import { useRastreoRealtime } from "./useRastreoRealtime";

export function useRastreoEnvio(envioId: number) {
  const { data: historial, isLoading } = useHistorialRastreo(envioId);

  const { eventos } = useRastreoRealtime(envioId, historial ?? []);

  return {
    eventos,
    isLoading,
  };
}
