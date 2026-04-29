import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEntregaOcurre() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/entrega-ocurre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al registrar entrega ocurre");
      return res.json();
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["almacen-inventario"] });
    },
  });
}
