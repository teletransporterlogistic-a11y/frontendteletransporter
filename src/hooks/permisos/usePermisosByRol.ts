import { useQuery } from "@tanstack/react-query";
import { getPermisosByRol } from "../../services/permisos.service";
import { Permiso } from "../../types/rol";

export function usePermisosByRol(rolId: number) {
  return useQuery<Permiso[]>({
    queryKey: ["permisos", rolId],
    queryFn: () => getPermisosByRol(rolId),
    enabled: !!rolId,
  });
}
