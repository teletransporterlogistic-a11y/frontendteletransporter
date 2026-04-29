import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../services/roles.service";
import { Rol } from "../../types/rol";

export function useRoles() {
  return useQuery<Rol[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
}
