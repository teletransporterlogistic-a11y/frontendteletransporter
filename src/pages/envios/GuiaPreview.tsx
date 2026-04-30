// src/components/GuiaPreview.tsx
import React from "react";

// ===============================
// Tipos
// ===============================
interface Cliente {
  nombre: string;
  calle?: string;
  numero?: string;
  colonia?: string;
  municipio?: string;
  ciudad?: string;
  estado?: string;
  telefono?: string;
  rfc?: string;
}

interface EnvioGuia {
  guia: string;

  pago_destino: boolean;
  fechaCreacion?: string;

  barcodeBase64?: string | null;
  qrBase64?: string | null;

  cliente?: Cliente;

  destinatarioNombre: string;
  destinatarioCalle?: string;
  destinatarioNumero?: string;
  destinatarioColonia?: string;
  destinatarioMunicipio?: string;
  destinatarioCiudad: string;
  destinatarioEstado: string;
  destinatarioTelefono?: string;

  cantidadPaquetes?: number;
  peso: number;

  costoTotal?: number;
  descuento?: number;
  subtotal?: number;
  iva?: number;
  retencionIVA?: boolean;
  retencion?: number;
  total?: number;

  observaciones?: string;
}

interface Props {
  envio: EnvioGuia | null;
}

// ===============================
// Componente
// ===============================
export default function GuiaPreview({ envio }: Props) {
  if (!envio) return null;

  const tipoPago = envio.pago_destino ? "FXC" : "PAG";

  const fecha = envio.fechaCreacion
    ? new Date(envio.fechaCreacion).toLocaleDateString()
    : "";

  return (
    <div className="card guia">
      <h2 className="titulo">Guía de Envío</h2>

      <div className="guia-box">
        {/* NÚMERO DE GUÍA */}
        <h3 className="guia-num">{envio.guia}</h3>

        {/* CÓDIGO DE BARRAS */}
        {envio.barcodeBase64 && (
          <img
            src={`data:image/png;base64,${envio.barcodeBase64}`}
            alt="Código de barras"
            className="barcode-img"
          />
        )}

        {/* QR */}
        {envio.qrBase64 && (
          <img
            src={`data:image/png;base64,${envio.qrBase64}`}
            alt="Código QR"
            className="qr-img"
          />
        )}

        <div className="separator" />

        {/* REMITENTE */}
        <div className="section">
          <h4>Remitente</h4>
          <p><strong>{envio.cliente?.nombre}</strong></p>
          <p>
            {envio.cliente?.calle} {envio.cliente?.numero}, Col.{" "}
            {envio.cliente?.colonia}
          </p>
          <p>Municipio: {envio.cliente?.municipio ?? "N/A"}</p>
          <p>
            {envio.cliente?.ciudad}, {envio.cliente?.estado}
          </p>
          <p>Tel: {envio.cliente?.telefono}</p>
          <p>RFC: {envio.cliente?.rfc}</p>
        </div>

        {/* DESTINATARIO */}
        <div className="section">
          <h4>Destinatario</h4>
          <p><strong>{envio.destinatarioNombre}</strong></p>
          <p>
            {envio.destinatarioCalle} #{envio.destinatarioNumero}, Col.{" "}
            {envio.destinatarioColonia}
          </p>
          <p>Municipio: {envio.destinatarioMunicipio ?? "N/A"}</p>
          <p>
            {envio.destinatarioCiudad}, {envio.destinatarioEstado}
          </p>
          <p>Tel: {envio.destinatarioTelefono}</p>
        </div>

        {/* DATOS DEL ENVÍO */}
        <div className="section">
          <h4>Datos del envío</h4>
          <p><strong>Paquetes:</strong> {envio.cantidadPaquetes ?? 1}</p>
          <p><strong>Peso:</strong> {envio.peso} kg</p>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Tipo de pago:</strong> {tipoPago}</p>
        </div>

        {/* COSTOS */}
        <div className="section">
          <h4>Costos</h4>
          <p>Suma de servicios: ${envio.costoTotal?.toFixed(2) ?? "0.00"}</p>
          <p>Descuento: -${envio.descuento?.toFixed(2) ?? "0.00"}</p>
          <p>Subtotal: ${envio.subtotal?.toFixed(2) ?? "0.00"}</p>
          <p>IVA 16%: ${envio.iva?.toFixed(2) ?? "0.00"}</p>

          {envio.retencionIVA && (
            <p>Retención IVA 4%: -${envio.retencion?.toFixed(2) ?? "0.00"}</p>
          )}

          <p><strong>Total: ${envio.total?.toFixed(2) ?? "0.00"}</strong></p>
        </div>

        {/* OBSERVACIONES */}
        <div className="section">
          <h4>Observaciones</h4>
          <p>{envio.observaciones || "N/A"}</p>
        </div>

        <p className="footer-msg">Teletransporter Logistics</p>
      </div>
    </div>
  );
}
