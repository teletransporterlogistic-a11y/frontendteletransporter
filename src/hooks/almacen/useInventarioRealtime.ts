import { useEffect, useState } from "react";
import { socket } from "../../lib/socket";
import { AlmacenInventario } from "../../types/almacen";

export function useInventarioRealtime(
  centroOperativoId: number,
  initialInventario: AlmacenInventario[] = []
) {
  const [inventario, setInventario] = useState(initialInventario);

  useEffect(() => {
    if (!centroOperativoId) return;

    // Unirse a la sala del centro operativo
    socket.emit("almacen:joinCentro", { centroOperativoId });

    const handler = (payload: {
      centroOperativoId: number;
      inventario: AlmacenInventario[];
    }) => {
      if (payload.centroOperativoId === centroOperativoId) {
        setInventario(payload.inventario);
      }
    };

    socket.on("almacen:update", handler);

    return () => {
      socket.off("almacen:update", handler);
    };
  }, [centroOperativoId]);

  return { inventario, setInventario };
}
