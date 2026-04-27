// src/pages/envios/EtiquetaTeletransporter.tsx
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/api";
import logo from "@/assets/logo.png";
import "./EtiquetaTeletransporter.css";

// ===============================
// Tipos
// ===============================
interface EnvioEtiqueta {
  id: number;
  guia: string;

  pago_destino: boolean;

  barcodeBase64: string;
  qrBase64: string;

  cantidadPaquetes: number;

  remitenteNombre: string;
  remitenteCalle?: string;
  remitenteNumero?: string;
  remitenteColonia?: string;
  remitenteMunicipio?: string;
  remitenteCiudad?: string;
  remitenteEstado?: string;
  remitenteTelefono?: string;
  remitenteRFC?: string;

  destinatarioNombre: string;
  destinatarioCalle?: string;
  destinatarioNumero?: string;
  destinatarioColonia?: string;
  destinatarioMunicipio?: string;
  destinatarioCiudad: string;
  destinatarioEstado: string;
  destinatarioTelefono?: string;

  peso: number;
  volumen?: number;
  valorDeclarado?: number;
  acuse?: boolean;

  ciudadDestino?: string;

  fechaCreacion: string;
}

interface LocationState {
  envio?: EnvioEtiqueta;
}

// ===============================
// Componente
// ===============================
export default function EtiquetaTeletransporter() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const [envio, setEnvio] = useState<EnvioEtiqueta | null>(
    state?.envio ?? null
  );

  // ===============================
  // Cargar envío si no viene por state
  // ===============================
  useEffect(() => {
    if (envio) return;

    async function fetchEnvio() {
      try {
        const res = await api.get(`/envios/${id}/completo`);
        setEnvio(res.data);
      } catch (err) {
        console.error("Error cargando envío:", err);
      }
    }

    if (id) fetchEnvio();
  }, [id, envio]);

  // ===============================
  // Validación
  // ===============================
  if (!envio) return <div>Cargando etiqueta...</div>;

  const tipoPago = envio.pago_destino ? "FXC" : "PAG";

  return (
    <div className="etiqueta-container">
      {/* ENCABEZADO */}
      <div className="header-row">
        <img src={logo} className="logo-img" />

        <div className="barcode-box">
          <img
            src={`data:image/png;base64,${envio.barcodeBase64}`}
            className="barcode-img"
            alt="Código de barras"
          />
          <div className="barcode-text">{envio.guia}</div>
        </div>

        <div className="sucursal-box">
          <div className="sucursal">MLM01</div>
          <div className="pago">{tipoPago}</div>
        </div>
      </div>

      <div className="titulo">SOLICITUD DE SERVICIO</div>

      {/* REMITENTE */}
      <div className="bloque">
        <h3>REMITE</h3>
        <strong>{envio.remitenteNombre}</strong><br />
        {envio.remitenteCalle} #{envio.remitenteNumero}<br />
        Col. {envio.remitenteColonia}<br />
        Municipio: {envio.remitenteMunicipio ?? "N/A"}<br />
        {envio.remitenteCiudad}, {envio.remitenteEstado}<br />
        Tel. {envio.remitenteTelefono}<br />
        RFC: {envio.remitenteRFC}<br />
        Cantidad: {envio.cantidadPaquetes}
      </div>

      {/* DESTINATARIO */}
      <div className="bloque">
        <h3>DESTINATARIO</h3>
        <strong>{envio.destinatarioNombre}</strong><br />
        {envio.destinatarioCalle} #{envio.destinatarioNumero}<br />
        Col. {envio.destinatarioColonia}<br />
        Municipio: {envio.destinatarioMunicipio ?? "N/A"}<br />
        {envio.destinatarioCiudad}, {envio.destinatarioEstado}<br />
        Tel. {envio.destinatarioTelefono}
      </div>

      {/* DATOS DEL ENVÍO */}
      <div className="bloque">
        <h3>DATOS DEL ENVÍO</h3>
        Peso: {envio.peso} kg<br />
        Volumen: {envio.volumen ?? 0} m³<br />
        Valor declarado: ${envio.valorDeclarado?.toFixed(2) ?? "0.00"}<br />
        Acuse: {envio.acuse ? "Sí" : "No"}<br />
        Ruta: {envio.ciudadDestino ?? envio.destinatarioCiudad}<br />
        Fecha: {new Date(envio.fechaCreacion).toLocaleDateString()}<br />
        Hora: {new Date(envio.fechaCreacion).toLocaleTimeString()}
      </div>

      {/* QR */}
      <div className="qr-box">
        <img
          src={`data:image/png;base64,${envio.qrBase64}`}
          className="qr-img"
          alt="QR"
        />
      </div>

      <button className="btn-print no-print" onClick={() => window.print()}>
        Imprimir Etiqueta
      </button>
    </div>
  );
}
