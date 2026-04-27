// src/pages/envios/ModificacionDeEstadoPage.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getEnvioById, actualizarEstadoEnvio } from "@/services/envios.service";
import { useEstadosEnvio } from "@/hooks/envios/useEstadosEnvio";

interface RouteParams {
  envioId?: string;
}

export default function ModificacionDeEstadoPage() {
  const { envioId } = useParams<RouteParams>();
  const id = Number(envioId);

  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState<string>("");
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
  // Estados disponibles
  // ===============================
  const { estados, getLabel } = useEstadosEnvio();

  // ===============================
  // Mutación
  // ===============================
  const mutation = useMutation({
    mutationFn: () =>
      actualizarEstadoEnvio(id, {
        estado: nuevoEstado,
        observacion
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["envio", id] });
      setModalOpen(false);
      setObservacion("");
      setNuevoEstado("");
    }
  });

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
    <div className="modificacion-estado-layout">
      <h1>Modificar Estado del Envío #{id}</h1>

      <div className="envio-info">
        <p><strong>Guía:</strong> {envio.guia ?? "SIN GUIA"}</p>
        <p><strong>Estado actual:</strong> {getLabel(envio.estadoActual)}</p>
        <p><strong>Cliente:</strong> {envio.remitenteNombre}</p>
      </div>

      <button
        className="btn-primary"
        onClick={() => setModalOpen(true)}
      >
        Cambiar Estado
      </button>

      {/* ===============================
          Modal
      =============================== */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Cambiar estado del envío</h2>

            <label>
              Nuevo estado:
              <select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
              >
                <option value="">Seleccione un estado</option>
                {estados.map((e) => (
                  <option key={e} value={e}>
                    {getLabel(e)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Observación:
              <textarea
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                placeholder="Describa el motivo del cambio"
              />
            </label>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>

              <button
                className="btn-primary"
                disabled={!nuevoEstado || !observacion || mutation.isPending}
                onClick={() => mutation.mutate()}
              >
                {mutation.isPending ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
