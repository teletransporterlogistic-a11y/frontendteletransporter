import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import logo from "../../assets/logo.png";
import "./EtiquetaTeletransporter.css";

export default function EtiquetaTeletransporter() {
  const { id } = useParams();
  const location = useLocation() as { state?: { envio?: any } };
  const [envio, setEnvio] = useState<any | null>(location.state?.envio ?? null);

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

  if (!envio) return <div>Cargando etiqueta...</div>;

  const tipoPago = envio.pago_destino ? "FXC" : "PAG";

  return (
    <div className="etiqueta-container">

      {/* ENCABEZADO */}
      <div className="header-row">
        <img src={logo} className="logo-img" />

        <div className="barcode-box">
          <img src={envio.barcodeBase64} className="barcode-img" />
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
        {envio.destinatarioCiudad}, {envio.destinatarioEstado}<br />
        Tel. {envio.destinatarioTelefono}
      </div>

      {/* DATOS DEL ENVÍO */}
      <div className="bloque">
        <h3>DATOS DEL ENVÍO</h3>
        Peso: {envio.peso} kg<br />
        Volumen: {envio.volumen} m³<br />
        Valor declarado: ${envio.valorDeclarado?.toFixed(2)}<br />
        Acuse: {envio.acuse ? "Sí" : "No"}<br />
        Ruta: {envio.ciudadDestino}<br />
        Fecha: {new Date(envio.fechaCreacion).toLocaleDateString()}<br />
        Hora: {new Date(envio.fechaCreacion).toLocaleTimeString()}
      </div>

      {/* QR (opcional) */}
      <div className="qr-box">
        <img src={envio.qrBase64} className="qr-img" />
      </div>

      <button className="btn-print no-print" onClick={() => window.print()}>
        Imprimir Etiqueta
      </button>
    </div>
  );
}
