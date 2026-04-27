import { useQuery } from "@tanstack/react-query";
import { getRutasOperativas } from "../../services/rutas-operativas.service";

export function useRutasOperativas() {
  return useQuery({
    queryKey: ["rutas-operativas"],
    queryFn: getRutasOperativas,
  });
}
