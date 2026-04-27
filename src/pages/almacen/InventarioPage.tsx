import { useState } from "react";
import { useInventario } from "../../hooks/almacen/useInventario";
import { useInventarioRealtime } from "../../hooks/almacen/useInventarioRealtime";
import { useCentrosOperativos } from "../../hooks/centros/useCentrosOperativos";

import InventarioKPIs from "../../components/almacen/InventarioKPIs";
import InventarioFilters from "../../components/almacen/InventarioFilters";
import InventarioTable from "../../components/almacen/InventarioTable";

export default function InventarioPage() {
  const [filters, setFilters] = useState({
    centroOperativoId: undefined,
    estado: undefined,
  });

  const { data: centros } = useCentrosOperativos({
    page: 1,
    pageSize: 999,
  });

  const { data: inventarioInicial } = useInventario(
    filters.centroOperativoId
  );

  const { inventario } = useInventarioRealtime(
    filters.centroOperativoId ?? 0,
    inventarioInicial ?? []
  );

  const inventarioFiltrado = inventario.filter((i) => {
    if (filters.estado && i.estado !== filters.estado) return false;
    return true;
  });

  return (
    <div className="inventario-layout">
      <h1>Inventario de Almacén</h1>

      <InventarioKPIs inventario={inventarioFiltrado} />

      <InventarioFilters
        filters={filters}
        setFilters={setFilters}
        centros={centros?.data ?? []}
      />

      <InventarioTable inventario={inventarioFiltrado} />
    </div>
  );
}
