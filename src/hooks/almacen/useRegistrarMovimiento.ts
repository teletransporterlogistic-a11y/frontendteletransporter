import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registrarMovimiento } from "../../services/almacen.service";
import { AlmacenMovimiento } from "../../types/almacen";

export function useRegistrarMovimiento() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      envioId: number;
      tipo: string;
      detalle?: string;
      operadorId?: number;
      lat?: number;
      lng?: number;
    }) => registrarMovimiento(data),

    onSuccess: (mov: AlmacenMovimiento) => {
      // Actualizar inventario
      qc.invalidateQueries({
        queryKey: ["almacen-inventario"],
      });

      // Actualizar movimientos del envío
      qc.invalidateQueries({
        queryKey: ["almacen-movimientos", mov.envioId],
      });
    },
  });
}
