// src/pages/almacen/MovimientosPage.tsx
import { useParams } from "react-router-dom";
import { useMovimientos } from "@/hooks/almacen/useMovimientos";

import MovimientosKPIs from "@/components/almacen/MovimientosKPIs";
import MovimientosTimeline from "@/components/almacen/MovimientosTimeline";
import MovimientosTable from "@/components/almacen/MovimientosTable";

// ===============================
// Tipos
// ===============================
interface RouteParams {
  envioId?: string;
}

export default function MovimientosPage() {
  const { envioId } = useParams<RouteParams>();

  const id = Number(envioId);

  // Si el ID no es válido, mostramos error
  if (!envioId || Number.isNaN(id)) {
    return <div>Error: ID de envío inválido</div>;
  }

  const { data: movimientos, isLoading } = useMovimientos(id);

  if (isLoading) return <div>Cargando movimientos...</div>;

  return (
    <div className="movimientos-layout">
      <h1>Movimientos del Envío #{id}</h1>

      <MovimientosKPIs movimientos={movimientos ?? []} />

      <h2>Timeline</h2>
      <MovimientosTimeline movimientos={movimientos ?? []} />

      <h2>Detalle</h2>
      <MovimientosTable movimientos={movimientos ?? []} />
    </div>
  );
}
