// src/pages/operaciones/DescargaPage.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getEnvioById, registrarDescarga } from "@/services/envios.service";
import MovimientosTimeline from "@/components/almacen/MovimientosTimeline";

interface RouteParams {
  envioId?: string;
}

export default function DescargaPage() {
  const { envioId } = useParams<RouteParams>();
  const id = Number(envioId);

  const queryClient = useQueryClient();

  const [observacion, setObservacion] = useState("");

  // ===============================
  // Cargar envío
  // ===============================
  const { data: envio, isLoading } = useQuery({
    queryKey: ["envio", id],
    queryFn: () => getEnvioById(id),
    enabled: !Number.isNaN(id)
  });

  // ===============================
  // Mutación: Registrar descarga
  // ===============================
  const mutation = useMutation({
    mutationFn: () =>
      registrarDescarga(id, {
        observacion
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["envio", id] });
      setObservacion("");
    }
  });

  // ===============================
  // Validaciones iniciales
  // ===============================
  if (!envioId || Number.isNaN(id)) {
    return <div>Error: ID de envío inválido</div>;
  }

  if (isLoading) {
    return <div>Cargando información del envío...</div>;
  }

  if (!envio) {
    return <div>No se encontró el envío solicitado</div>;
  }

  // ===============================
  // Render
  // ===============================
  return (
    <div className="descarga-layout">
      <h1>Descarga del Envío #{id}</h1>

      <div className="envio-info">
        <p><strong>Guía:</strong> {envio.guia ?? "SIN GUIA"}</p>
        <p><strong>Estado actual:</strong> {envio.estadoActual}</p>
        <p><strong>Cliente:</strong> {envio.remitenteNombre}</p>
      </div>

      <h2>Registrar Descarga</h2>

      <div className="form-section">
        <label>
          Observación:
          <textarea
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            placeholder="Describa la condición del paquete al descargar"
          />
        </label>

        <button
          className="btn-primary"
          disabled={!observacion || mutation.isPending}
          onClick={() => mutation.mutate()}
        >
          {mutation.isPending ? "Guardando..." : "Registrar Descarga"}
        </button>
      </div>

      <h2>Movimientos del Envío</h2>
      <MovimientosTimeline movimientos={envio.movimientos ?? []} />
    </div>
  );
}
