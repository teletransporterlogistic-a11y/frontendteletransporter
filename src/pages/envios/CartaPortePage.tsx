import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CartaPortePreview.css";

export default function CartaPortePreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const envio = location.state?.envio;

  useEffect(() => {
    if (!envio) return;

    // Ejecutar impresión una sola vez
    window.print();

    // Preguntar una sola vez después de un pequeño delay
    const timer = setTimeout(() => {
      const ok = window.confirm("¿La Carta Porte se imprimió correctamente?");
      if (ok) {
        navigate("/envios/preview-recibo", { state: { envio } });
      }
      // Si dice NO, simplemente no hacemos nada
      // El usuario puede volver a imprimir manualmente
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
        <div className="cp-header">
          <div className="logo">Teletransporter</div>
          <div className="cp-guia">Guía: {envio.guia}</div>
        </div>

        <div className="cp-section">
          <h3>Remitente</h3>
          <p>{envio.cliente?.nombre}</p>
          <p>
            {envio.cliente?.calle} {envio.cliente?.numero},{" "}
            {envio.cliente?.colonias}, {envio.cliente?.ciudad},{" "}
            {envio.cliente?.estado}, CP {envio.cliente?.codigoPostal}
          </p>
        </div>

        <div className="cp-section">
          <h3>Destinatario</h3>
          <p>{envio.destinatarioNombre}</p>
          <p>
            {envio.destinatarioCalle} {envio.destinatarioNumero},{" "}
            {envio.destinatarioColonia}, {envio.destinatarioCiudad},{" "}
            {envio.destinatarioEstado}, CP {envio.destinatarioCP}
          </p>
        </div>

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
