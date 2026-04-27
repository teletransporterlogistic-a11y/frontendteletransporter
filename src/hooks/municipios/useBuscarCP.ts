// src/hooks/useBuscarCP.ts
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/apiFetch";
import { useDebounce } from "./useDebounce";

export function useBuscarCP(cp: string) {
  const debouncedCP = useDebounce(cp, 400);

  return useQuery({
    queryKey: ["cp", debouncedCP],
    queryFn: () => apiFetch(`/codigos-postales/${debouncedCP}`),
    enabled: debouncedCP.length === 5,
    staleTime: 1000 * 60 * 60, // 1 hora
  });
}
