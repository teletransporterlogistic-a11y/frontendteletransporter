// src/pages/clientes/HistorialFiscalCliente.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generarFacturaPDF } from "@/utils/FacturaPDF";
import "./HistorialFiscalCliente.css";

// ===============================
// Tipos
// ===============================
interface FacturaCostos {
  total: number;
  iva: number;
  retencion: number;
  subtotal: number;
  subtotalConDescuento: number;
  descuentoAplicado: number;
  totalUnitario: number;
  cantidadPaquetes: number;
}

interface FacturaEnvio {
  descripcion: string;
}

interface Factura {
  folio: string | number;
  fecha: string;
  costos: FacturaCostos;
  envio: FacturaEnvio;
}

interface ClienteFiscal {
  nombre: string;
  rfc?: string;
  razonSocial?: string;
  domicilioFiscal?: string;
  tieneCredito?: boolean;
  creditoDisponible?: number;
}

interface RouteParams {
  id?: string;
}

// ===============================
// Componente
// ===============================
export default function HistorialFiscalCliente() {
  const { id } = useParams<RouteParams>();

  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [cliente, setCliente] = useState<ClienteFiscal | null>(null);

  // ===============================
  // Cargar datos desde localStorage
  // ===============================
  useEffect(() => {
    if (!id) return;

    const data = localStorage.getItem(`facturas_cliente_${id}`);
    const clienteData = localStorage.getItem(`cliente_${id}`);

    if (data) {
      try {
        setFacturas(JSON.parse(data));
      } catch {
        setFacturas([]);
      }
    }

    if (clienteData) {
      try {
        setCliente(JSON.parse(clienteData));
      } catch {
        setCliente(null);
      }
    }
  }, [id]);

  // ===============================
  // Descargar PDF
  // ===============================
  function descargarFactura(factura: Factura) {
    generarFacturaPDF(factura);
  }

  // ===============================
  // Render
  // ===============================
  if (!cliente) {
    return <div className="historial-container">Cliente no encontrado.</div>;
  }

  return (
    <div className="historial-container">
      <h2>Historial Fiscal de {cliente.nombre}</h2>

      <div className="cliente-info">
        <p><strong>RFC:</strong> {cliente.rfc || "No registrado"}</p>
        <p><strong>Razón Social:</strong> {cliente.razonSocial || "No registrada"}</p>
        <p><strong>Domicilio Fiscal:</strong> {cliente.domicilioFiscal || "No registrado"}</p>

        {cliente.tieneCredito && (
          <p>
            <strong>Crédito disponible:</strong>{" "}
            ${cliente.creditoDisponible?.toFixed(2)}
          </p>
        )}
      </div>

      {facturas.length === 0 ? (
        <p>No hay facturas registradas para este cliente.</p>
      ) : (
        <table className="tabla-facturas">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>IVA</th>
              <th>Retención</th>
              <th>Contenido</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {facturas.map((f, i) => (
              <tr key={i}>
                <td>{f.folio}</td>
                <td>{f.fecha}</td>
                <td>${f.costos.total.toFixed(2)}</td>
                <td>${f.costos.iva.toFixed(2)}</td>
                <td>${f.costos.retencion.toFixed(2)}</td>
                <td>{f.envio.descripcion}</td>
                <td>
                  <button
                    className="btn-primary"
                    onClick={() => descargarFactura(f)}
                  >
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
