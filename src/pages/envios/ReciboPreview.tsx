// src/pages/recibos/ReciboPreview.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReciboPreview.css";

// ===============================
// Tipos
// ===============================
interface Cliente {
  nombre: string;
  rfc?: string;
}

interface Envio {
  id: number;
  guia: string;
  fechaCreacion: string;
  destinatarioCiudad: string;
  usuario?: string;
  tipoPago?: string;
  total?: number;
  costoTotal?: number;
  costo?: number;
  cliente?: Cliente;
}

interface LocationState {
  envio?: Envio;
  cliente?: Cliente;
}

// ===============================
// Componente
// ===============================
export default function ReciboPreview() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | undefined;
  const envio = state?.envio;
  const clienteEntrega = state?.cliente;

  // ===============================
  // Impresión automática
  // ===============================
  useEffect(() => {
    if (!envio) return;

    const timer = setTimeout(() => {
      const printAndConfirm = () => {
        window.print();

        setTimeout(() => {
          const ok = window.confirm("¿El recibo se imprimió correctamente?");
          if (ok) {
            localStorage.removeItem("envio_form");

            alert(
              `El envío con guía ${envio.guia} se generó con éxito y su pago fue recibido.`
            );

            navigate("/");
          } else {
            printAndConfirm();
          }
        }, 300);
      };

      printAndConfirm();
    }, 300);

    return () => clearTimeout(timer);
  }, [envio, navigate]);

  // ===============================
  // Validación
  // ===============================
  if (!envio) {
    return <div className="error-msg">No hay datos del envío.</div>;
  }

  // ===============================
  // Cliente final
  // ===============================
  const cliente: Cliente =
    clienteEntrega || envio.cliente || { nombre: "CLIENTE", rfc: "N/A" };

  // ===============================
  // Total
  // ===============================
  const total =
    envio.total ?? envio.costoTotal ?? envio.costo ?? 0;

  const numeroALetras = (num: number): string => {
    try {
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
      }).format(num);
    } catch {
      return String(num);
    }
  };

  const fecha = new Date(envio.fechaCreacion).toLocaleDateString();
  const hora = new Date(envio.fechaCreacion).toLocaleTimeString();

  // ===============================
  // Render
  // ===============================
  return (
    <div className="recibo-container">
      <h2 className="recibo-title">RECIBO DE PAGO</h2>

      <div className="recibo-card">
        <p className="leyenda">
          RECIBO DE PAGO POR CONCEPTO DE ENVÍO DE PAQUETERÍA CON EL NÚMERO DE GUÍA:
          <strong> {envio.guia}</strong>
        </p>

        <p className="leyenda">
          POR CONCEPTO DE ENVÍO A: <strong>{envio.destinatarioCiudad}</strong>
        </p>

        <div className="datos-fiscales">
          <strong>TELETRANSPORTER PAQUETERÍA Y MENSAJERÍA</strong><br />
          Y/O EDUARDO SERRANO LÓPEZ<br />
          RFC: SELE821213T70<br />
          LAGUNA DE SAN JUANICO 150, COL. EL LAGO 1<br />
          MORELIA, MICHOACÁN, CP 58115<br />
          Tel: 443 2732530<br />
          Correo: administracion@teletransporter.mx
        </div>

        <div className="recibo-section">
          <h3>CLIENTE</h3>
          <p><strong>{cliente.nombre}</strong></p>
          <p>RFC: {cliente.rfc ?? "N/A"}</p>
        </div>

        <div className="recibo-section">
          <h3>DATOS DE LA OPERACIÓN</h3>
          <p>Fecha: {fecha}</p>
          <p>Hora: {hora}</p>
          <p>Usuario: {envio.usuario ?? "MOSTRADOR"}</p>
          <p>Forma de pago: {envio.tipoPago ?? "EFECTIVO"}</p>
        </div>

        <div className="recibo-section">
          <h3>IMPORTE</h3>
          <p>Importe recibido: <strong>${total}</strong></p>
          <p>En letra: <em>{numeroALetras(total)}</em></p>
        </div>

        <p className="no-fiscal">ESTE NO ES UN COMPROBANTE FISCAL</p>

        <p className="factura">
          Solicite su factura en <strong>teletransporter.mx</strong> o al correo
          <strong> administracion@teletransporter.mx</strong>
        </p>

        <div className="firma">
          ______________________________<br />
          Firma del cliente
        </div>
      </div>

      <button
        className="btn-finalizar"
        onClick={() => {
          localStorage.removeItem("envio_form");
          navigate("/");
        }}
      >
        Finalizar
      </button>
    </div>
  );
}
