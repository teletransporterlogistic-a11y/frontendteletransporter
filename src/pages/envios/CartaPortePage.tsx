// src/pages/envios/CartaPortePreview.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CartaPortePreview.css";

export default function CartaPortePreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const envio = location.state?.envio;

  useEffect(() => {
    if (!envio) return;

    window.print();

    const timer = setTimeout(() => {
      const ok = window.confirm("¿La Carta Porte se imprimió correctamente?");
      if (ok) {
        navigate("/envios/preview-recibo", { state: { envio } });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [envio, navigate]);

  if (!envio) {
    return <div className="error-msg">No hay datos del envío.</div>;
  }

  return (
    <div className="carta-porte-page">
      <h2 className="title">Carta Porte</h2>

      <div className="carta-porte-card">
        {/* ENCABEZADO */}
        <div className="cp-header">
          <div className="logo">Teletransporter</div>
          <div className="cp-guia">Guía: {envio.guia}</div>
        </div>

        {/* REMITENTE */}
        <div className="cp-section">
          <h3>Remitente</h3>
          <p>{envio.cliente?.nombre}</p>
          <p>
            {envio.cliente?.calle} {envio.cliente?.numero},{" "}
            {envio.cliente?.colonia}, Municipio: {envio.cliente?.municipio ?? "N/A"},{" "}
            {envio.cliente?.ciudad}, {envio.cliente?.estado},  
            CP {envio.cliente?.codigoPostal}
          </p>
        </div>

        {/* DESTINATARIO */}
        <div className="cp-section">
          <h3>Destinatario</h3>
          <p>{envio.destinatarioNombre}</p>
          <p>
            {envio.destinatarioCalle} {envio.destinatarioNumero},{" "}
            {envio.destinatarioColonia}, Municipio: {envio.destinatarioMunicipio ?? "N/A"},{" "}
            {envio.destinatarioCiudad}, {envio.destinatarioEstado},  
            CP {envio.destinatarioCP}
          </p>
        </div>

        {/* DATOS DEL ENVÍO */}
        <div className="cp-section">
          <h3>Datos del envío</h3>
          <p>Paquetes: {envio.cantidadPaquetes}</p>
          <p>Peso: {envio.peso} kg</p>
          <p>Contenido: {envio.descripcionContenido}</p>
          <p>Valor declarado: ${envio.valorDeclarado ?? 0}</p>
        </div>
      </div>

      <div className="acciones-footer">
        <button className="btn-secondary" onClick={() => navigate(-1)}>
          Regresar
        </button>
      </div>
    </div>
  );
}
