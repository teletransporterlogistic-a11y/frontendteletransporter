// src/components/rastreo/TrackingTimeline.tsx
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  TruckIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

import React from "react";

// ===============================
// Tipos
// ===============================
export interface EventoTracking {
  tipo: string;
  descripcion?: string;
  ubicacion?: string;
  fecha: string;
}

interface Props {
  eventos: EventoTracking[];
}

// ===============================
// Mapa de íconos
// ===============================
const iconMap: Record<string, JSX.Element> = {
  creado: <ClockIcon className="icon" />,
  transito: <TruckIcon className="icon" />,
  ruta: <MapPinIcon className="icon" />,
  entregado: <CheckCircleIcon className="icon" />,
  incidencia: <ExclamationTriangleIcon className="icon" />,
};

// ===============================
// Componente
// ===============================
export default function TrackingTimeline({ eventos }: Props) {
  if (!Array.isArray(eventos) || eventos.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>
          Línea de Tiempo del Envío
        </h2>
        <p style={{ color: "#6B7280" }}>No hay eventos registrados.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>
        Línea de Tiempo del Envío
      </h2>

      <div style={{ borderLeft: "3px solid #d1d5db", paddingLeft: "20px" }}>
        {eventos.map((ev, i) => {
          const tipo = ev.tipo?.toLowerCase() || "creado";
          const icon = iconMap[tipo] || <ClockIcon className="icon" />;

          return (
            <div
              key={i}
              style={{
                marginBottom: "25px",
                position: "relative",
              }}
            >
              {/* Ícono */}
              <div
                style={{
                  position: "absolute",
                  left: "-32px",
                  top: "0",
                  background: "white",
                  borderRadius: "50%",
                  padding: "6px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ width: "20px", height: "20px", color: "#4B5563" }}>
                  {icon}
                </div>
              </div>

              {/* Descripción */}
              <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                {ev.descripcion || "Sin descripción"}
              </div>

              {/* Ubicación */}
              <div style={{ color: "#6B7280", fontSize: "14px" }}>
                {ev.ubicacion || "Sin ubicación"}
              </div>

              {/* Fecha */}
              <div
                style={{
                  color: "#9CA3AF",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                {new Date(ev.fecha).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
