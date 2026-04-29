import { useMutation } from "@tanstack/react-query";

export function useUpdateEntregaOcurre() {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await fetch(`/api/entrega-ocurre/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al actualizar entrega ocurre");
      return res.json();
    },
  });
}
