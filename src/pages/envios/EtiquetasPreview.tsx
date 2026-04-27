// src/pages/envios/EtiquetasPreview.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EtiquetasPreview.css";
import logo from "@/assets/logo.png";

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

interface EnvioEtiqueta {
  id: number;
  guia: string;

  cantidadPaquetes?: number;
  pago_destino: boolean;

  barcodeBase64: string;
  qrBase64: string;

  cliente?: Cliente;

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

  fechaCreacion: string;
}

interface LocationState {
  envio?: EnvioEtiqueta;
}

// ===============================
// Componente
// ===============================
export default function EtiquetasPreview() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | undefined;
  const envio = state?.envio;

  // ===============================
  // Impresión automática
  // ===============================
  useEffect(() => {
    if (!envio) return;

    const timer = setTimeout(() => {
      window.print();

      setTimeout(() => {
        const ok = window.confirm("¿Se imprimieron correctamente las etiquetas?");
        if (ok) {
          navigate("/envios/preview-carta-porte", { state: { envio } });
        }
      }, 300);
    }, 600);

    return () => clearTimeout(timer);
  }, [envio, navigate]);

  // ===============================
  // Validación
  // ===============================
  if (!envio) return <div>No hay datos del envío.</div>;

  const total = envio.cantidadPaquetes || 1;
  const etiquetas = Array.from({ length: total }, (_, i) => i + 1);
  const tipoPago = envio.pago_destino ? "FXC" : "PAG";

  // ===============================
  // Render
  // ===============================
  return (
    <div className="etiqueta-container">
      {etiquetas.map((num) => (
        <div key={num} style={{ pageBreakAfter: "always" }}>
          {/* ENCABEZADO */}
          <div className="header-row">
            {/* LOGO + QR */}
            <div className="logo-box">
              <img src={logo} className="logo-img" />
              <img
                src={`data:image/png;base64,${envio.qrBase64}`}
                className="qr-img"
                alt="QR"
              />
            </div>

            {/* BARCODE */}
            <div className="barcode-box">
              <img
                src={`data:image/png;base64,${envio.barcodeBase64}`}
                className="barcode-img"
                alt="Código de barras"
              />
              <div className="guia-text">{envio.guia}</div>
            </div>

            {/* SUCURSAL + TIPO DE PAGO */}
            <div className="sucursal-box">
              <div className="sucursal">MLM01</div>
              <div className="pago">{tipoPago}</div>
            </div>
          </div>

          {/* BLOQUES DE INFORMACIÓN */}
          <div className="info-row">
            {/* DESTINATARIO */}
            <div className="info-box">
              <h3>DESTINATARIO</h3>
              <p><strong>{envio.destinatarioNombre}</strong></p>
              <p>{envio.destinatarioCalle} #{envio.destinatarioNumero}</p>
              <p>Col. {envio.destinatarioColonia}</p>
              <p>Municipio: {envio.destinatarioMunicipio ?? "N/A"}</p>
              <p>{envio.destinatarioCiudad}, {envio.destinatarioEstado}</p>
              <p>Tel. {envio.destinatarioTelefono}</p>
              <p>Paquete {num}/{total}</p>
            </div>

            {/* REMITENTE */}
            <div className="info-box">
              <h3>REMITENTE</h3>
              <p><strong>{envio.cliente?.nombre}</strong></p>
              <p>{envio.cliente?.calle} {envio.cliente?.numero}</p>
              <p>Col. {envio.cliente?.colonia}</p>
              <p>Municipio: {envio.cliente?.municipio ?? "N/A"}</p>
              <p>{envio.cliente?.ciudad}, {envio.cliente?.estado}</p>
              <p>Tel. {envio.cliente?.telefono}</p>
              <p>RFC: {envio.cliente?.rfc}</p>
            </div>

            {/* DATOS DEL ENVÍO */}
            <div className="info-box">
              <h3>ENVÍO</h3>
              <p>Peso: {envio.peso} kg</p>
              <p>Volumen: {envio.volumen ?? 0} m³</p>
              <p>Valor declarado: ${envio.valorDeclarado ?? 0}</p>
              <p>Acuse: {envio.acuse ? "Sí" : "No"}</p>
              <p>Ruta: {envio.destinatarioCiudad}</p>
              <p>Fecha: {new Date(envio.fechaCreacion).toLocaleDateString()}</p>
              <p>Hora: {new Date(envio.fechaCreacion).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
