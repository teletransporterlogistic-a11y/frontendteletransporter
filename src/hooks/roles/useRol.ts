import { useQuery } from "@tanstack/react-query";
import { getRol } from "../../services/roles.service";
import { Rol } from "../../types/rol";

export function useRol(id: number) {
  return useQuery<Rol>({
    queryKey: ["rol", id],
    queryFn: () => getRol(id),
    enabled: !!id,
  });
}
