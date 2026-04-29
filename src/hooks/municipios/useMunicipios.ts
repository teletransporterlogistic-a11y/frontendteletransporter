// src/hooks/municipios/useMunicipios.ts
import { useQuery } from "@tanstack/react-query";
import { getMunicipios } from "../../services/municipio.service";
import { Municipio } from "../../types/types";

export function useMunicipios() {
  return useQuery<Municipio[]>({
    queryKey: ["municipios"],
    queryFn: getMunicipios,
    staleTime: 1000 * 60 * 60, // 1 hora
  });
}
