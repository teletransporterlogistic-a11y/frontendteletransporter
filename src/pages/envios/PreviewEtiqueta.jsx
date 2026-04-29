import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EtiquetasPreview.css";
import logo from "../../assets/logo.png";

export default function EtiquetasPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const envio = location.state?.envio;

  useEffect(() => {
    if (!envio) return;

    setTimeout(() => {
      window.print();

      setTimeout(() => {
        const ok = window.confirm("¿Se imprimieron correctamente las etiquetas?");
        if (ok) {
          navigate("/envios/preview-carta-porte", { state: { envio } });
        }
      }, 300);
    }, 600);
  }, [envio, navigate]);

  if (!envio) return <div>No hay datos del envío.</div>;

  const total = envio.cantidadPaquetes || 1;
  const etiquetas = Array.from({ length: total }, (_, i) => i + 1);
  const tipoPago = envio.pago_destino ? "FXC" : "PAG";

  return (
    <div className="print-container">
      {etiquetas.map((num) => (
        <div key={num} className="etiqueta-card">

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

          {/* REMITENTE */}
          <div className="bloque">
            <h3>REMITENTE</h3>
            <strong>{envio.cliente?.nombre}</strong><br />
            {envio.cliente?.calle} {envio.cliente?.numero}<br />
            Col. {envio.cliente?.colonia}<br />
            {envio.cliente?.ciudad}, {envio.cliente?.estado}<br />
            Tel. {envio.cliente?.telefono}<br />
            RFC: {envio.cliente?.rfc}<br />
            Paquete {num}/{total}
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
            Valor declarado: ${envio.valorDeclarado ?? 0}<br />
            Acuse: {envio.acuse ? "Sí" : "No"}<br />
            Ruta: {envio.destinatarioCiudad}<br />
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

        </div>
      ))}
    </div>
  );
}
