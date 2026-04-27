export type EstadoEnvio =
  | "PENDIENTE"
  | "EN_RECOLECCION"
  | "EN_TRANSITO"
  | "EN_REPARTO"
  | "ENTREGADO"
  | "INCIDENCIA";

export function useEstadosEnvio() {
  const estados: { value: EstadoEnvio; label: string }[] = [
    { value: "PENDIENTE",       label: "Pendiente" },
    { value: "EN_RECOLECCION",  label: "En recolección" },
    { value: "EN_TRANSITO",     label: "En tránsito" },
    { value: "EN_REPARTO",      label: "En reparto" },
    { value: "ENTREGADO",       label: "Entregado" },
    { value: "INCIDENCIA",      label: "Incidencia" },
  ];

  const getLabel = (estado: EstadoEnvio) =>
    estados.find((e) => e.value === estado)?.label ?? estado;

  return {
    estados,
    getLabel,
  };
}
