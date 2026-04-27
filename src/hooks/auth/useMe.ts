import { useQuery } from "@tanstack/react-query";

export interface MeResponse {
  id: number;
  nombre: string;
  email: string;
  rolId: number;
  permisos: string[];
}

export function useMe() {
  return useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
      });
      if (!res.ok) throw new Error("No autenticado");
      return res.json();
    },
    retry: false,
  });
}
