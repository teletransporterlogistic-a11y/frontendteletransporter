import { useQuery } from "@tanstack/react-query";
import { getRutas } from "../../services/rutas.service";

export function useRutas() {
  return useQuery({
    queryKey: ["rutas"],
    queryFn: getRutas,
  });
}
