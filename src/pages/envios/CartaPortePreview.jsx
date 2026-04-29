import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CartaPortePreview.css";
import logo from "../../assets/logo.png";

export default function CartaPortePreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const envio = location.state?.envio;

  useEffect(() => {
    if (!envio) return;

    setTimeout(() => {
      window.print();

      setTimeout(() => {
        const ok = window.confirm("¿La Carta Porte se imprimió correctamente?");
        if (ok) {
          navigate("/envios/preview-recibo", { state: { envio } });
        }
      }, 300);
    }, 400);
  }, [envio, navigate]);

  if (!envio) return <div>No hay datos del envío.</div>;

  const fecha = new Date(envio.fechaCreacion).toLocaleDateString();
  const tipoPago = envio.pago_destino ? "FXC" : "PAG";

  return (
    <div className="cp-container">

      {/* ENCABEZADO */}
      <div className="cp-header">
        <img src={logo} className="cp-logo" />
        <div className="cp-title-block">
          <h2 className="cp-title">CARTA PORTE</h2>
          <p className="cp-address">
            Laguna de San Juanico No. 150, Col. Lago 1, Morelia Mich. C.P. 58118<br />
            Teléfono: 443 797 3737
          </p>
        </div>
        <div className="cp-guia-box">
          <strong>Guía:</strong> {envio.guia}<br />
          <strong>Fecha:</strong> {fecha}
        </div>
      </div>

      {/* REMITENTE Y DESTINATARIO */}
      <div className="cp-row">
        <div className="cp-box">
          <h3>Remitente</h3>
          <p><strong>{envio.cliente?.nombre}</strong></p>
          <p>{envio.cliente?.calle} {envio.cliente?.numero}</p>
          <p>Col. {envio.cliente?.colonia}</p>
          <p>{envio.cliente?.ciudad}, {envio.cliente?.estado}</p>
          <p>CP {envio.cliente?.codigoPostal}</p>
          <p>RFC: {envio.cliente?.rfc}</p>
          <p>Correo: {envio.cliente?.correo ?? "N/A"}</p>
        </div>

        <div className="cp-box">
          <h3>Destinatario</h3>
          <p><strong>{envio.destinatarioNombre}</strong></p>
          <p>{envio.destinatarioCalle} #{envio.destinatarioNumero}</p>
          <p>Col. {envio.destinatarioColonia}</p>
          <p>{envio.destinatarioCiudad}, {envio.destinatarioEstado}</p>
          <p>CP {envio.destinatarioCodigoPostal}</p>
          <p>RFC: {envio.destinatarioRFC ?? "N/A"}</p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="cp-section">
        <h3>Contenido</h3>
        <p><strong>Cantidad:</strong> {envio.cantidadPaquetes}</p>
        <p><strong>Peso:</strong> {envio.peso} kg</p>
        <p><strong>Contenido:</strong> {envio.descripcionContenido}</p>
        <p><strong>Observaciones:</strong> {envio.observaciones || "N/A"}</p>
      </div>

      {/* COSTOS */}
      <div className="cp-section">
        <h3>Costos</h3>
        <p>Flete: ${envio.costoFlete?.toFixed(2) ?? envio.costoTotal?.toFixed(2)}</p>
        <p>Servicios: ${envio.costoServicios?.toFixed(2) ?? "0.00"}</p>
        <p>Subtotal general: ${envio.subtotal?.toFixed(2)}</p>
        <p>IVA 16%: ${envio.iva?.toFixed(2)}</p>
        {envio.retencionIVA && (
          <p>Retención IVA 4%: -${envio.retencion?.toFixed(2)}</p>
        )}
        <p><strong>Total: ${envio.total?.toFixed(2)}</strong></p>
      </div>

      {/* NOTAS */}
      <div className="cp-section">
        <h3>Notas</h3>
        <p>INT: {envio.int ?? "NO"}</p>
        <p>FXC: {tipoPago}</p>
        <p>ORD: {envio.ord ?? "N/A"}</p>
        <p>EAD: {envio.ead ?? "N/A"}</p>
      </div>

      {/* FIRMA */}
      <div className="cp-firma">
        <div className="cp-firma-line">______________________________</div>
        <div className="cp-firma-nombre">{envio.cliente?.nombre}</div>
      </div>

    </div>
  );
}
