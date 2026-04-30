// src/pages/envios/GenerarGuiaPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/api";

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
  id: number;
  guia: string;

  pago_destino: boolean;
  fechaCreacion?: string;

  cliente?: Cliente;

  destinatarioNombre: string;
  destinatarioCalle?: string;
  destinatarioNumero?: string;
  destinatarioColonia?: string;
  destinatarioMunicipio?: string;
  destinatarioCiudad: string;
  destinatarioEstado: string;
  destinatarioTelefono?: string;

  cantidadPaquetes: number;
  peso: number;
  descripcionContenido?: string;
  valorDeclarado?: number;

  recoleccion?: boolean;
  acuse?: boolean;
  cobrese_o_devuelvase?: boolean;

  costoTotal?: number;
  descuento?: number;
  subtotal?: number;
  iva?: number;
  retencionIVA?: boolean;
  retencion?: number;
  total?: number;

  observaciones?: string;

  qrBase64?: string;
  barcodeBase64?: string;
}

// ===============================
// Componente
// ===============================
export default function GenerarGuiaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [envio, setEnvio] = useState<EnvioGuia | null>(null);

  useEffect(() => {
    async function fetchEnvio() {
      try {
        const res = await api.get(`/envios/${id}/completo`);
        setEnvio(res.data);
      } catch (err) {
        console.error("Error cargando envío:", err);
      }
    }
    fetchEnvio();
  }, [id]);

  if (!envio) return <div className="p-6">Cargando...</div>;

  const tipoPago = envio.pago_destino ? "FXC" : "PAG";
  const fecha = envio.fechaCreacion
    ? new Date(envio.fechaCreacion).toLocaleDateString()
    : "";

  return (
    <div className="guia-wrapper">
      <h2 className="guia-title">Guía generada correctamente</h2>

      <div className="guia-card">

        {/* DATOS GENERALES */}
        <div className="section">
          <h4>Datos generales</h4>
          <p><strong>Guía:</strong> {envio.guia}</p>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Tipo de pago:</strong> {tipoPago}</p>
        </div>

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

        {/* DETALLES DEL ENVÍO */}
        <div className="section">
          <h4>Detalles del envío</h4>
          <p><strong>Paquetes:</strong> {envio.cantidadPaquetes}</p>
          <p><strong>Peso:</strong> {envio.peso} kg</p>
          <p><strong>Contenido:</strong> {envio.descripcionContenido}</p>
          <p><strong>Valor declarado:</strong> ${envio.valorDeclarado}</p>
        </div>

        {/* SERVICIOS ADICIONALES */}
        <div className="section">
          <h4>Servicios adicionales</h4>
          {envio.recoleccion && <p>• Recolección</p>}
          {envio.acuse && <p>• Acuse</p>}
          {envio.cobrese_o_devuelvase && <p>• Cóbrese o devuélvase</p>}
          {envio.valorDeclarado && envio.valorDeclarado > 0 && <p>• Seguro</p>}
          {!envio.recoleccion &&
            !envio.acuse &&
            !envio.cobrese_o_devuelvase &&
            (!envio.valorDeclarado || envio.valorDeclarado === 0) && (
              <p>Ninguno</p>
            )}
        </div>

        {/* COSTOS */}
        <div className="section">
          <h4>Costos</h4>
          <p>Suma de servicios: ${envio.costoTotal?.toFixed(2)}</p>
          <p>Descuento: -${envio.descuento?.toFixed(2) ?? "0.00"}</p>
          <p>Subtotal: ${envio.subtotal?.toFixed(2)}</p>
          <p>IVA 16%: ${envio.iva?.toFixed(2)}</p>
          {envio.retencionIVA && (
            <p>Retención IVA 4%: -${envio.retencion?.toFixed(2)}</p>
          )}
          <p><strong>Total: ${envio.total?.toFixed(2)}</strong></p>
        </div>

        {/* OBSERVACIONES */}
        <div className="section">
          <h4>Observaciones</h4>
          <p>{envio.observaciones || "N/A"}</p>
        </div>

        {/* QR + BARCODE */}
        <div className="qr-section">
          {envio.qrBase64 && (
            <img src={`data:image/png;base64,${envio.qrBase64}`} alt="QR" />
          )}

          {envio.barcodeBase64 && (
            <img
              src={`data:image/png;base64,${envio.barcodeBase64}`}
              alt="Barcode"
              className="barcode-img"
            />
          )}
        </div>

        {/* FIRMA */}
        <div className="section" style={{ marginTop: "30px", textAlign: "center" }}>
          <div style={{ marginBottom: "6px" }}>______________________________</div>
          <div>{envio.cliente?.nombre}</div>
          <small>
            Acepto las condiciones estipuladas en la parte trasera de esta carta porte y/o solicitud de servicio
          </small>
        </div>
      </div>

      {/* BOTONES */}
      <div className="btn-group">
        <button
          onClick={() =>
            navigate("/envios/preview-etiqueta", { state: { envio } })
          }
          className="btn-primary"
        >
          Imprimir Etiqueta
        </button>

        <button
          onClick={() =>
            navigate("/envios/preview-carta-porte", { state: { envio } })
          }
          className="btn-primary"
        >
          Imprimir Carta Porte
        </button>

        <button
          onClick={() =>
            navigate("/envios/preview-recibo", { state: { envio } })
          }
          className="btn-primary"
        >
          Imprimir Recibo
        </button>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("envio_form");
          navigate("/envios");
        }}
        className="btn-finish"
      >
        Finalizar
      </button>
    </div>
  );
}
