import { useQuery } from "@tanstack/react-query";
import { getEnviosActivos } from "../../services/rastreo.service";
import { EnvioActivo } from "../../types/rastreo";

export function useEnviosActivos(filters: {
  unidadId?: number;
  rutaId?: number;
  centroOperativoId?: number;
}) {
  return useQuery<EnvioActivo[]>({
    queryKey: ["envios-activos", filters],
    queryFn: () => getEnviosActivos(filters),
    refetchInterval: 5000, // refresco automático
  });
}
