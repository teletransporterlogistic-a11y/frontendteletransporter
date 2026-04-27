// src/utils/ReciboPagoPDF.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ===============================
// Tipos
// ===============================
export interface PagoEnvio {
  metodo?: string;
  pagaCon?: number;
  cambio?: number;
}

export interface CostoEnvio {
  total: number;
  cantidadPaquetes: number;
}

export interface EnvioRecibo {
  guia?: string;

  remitenteNombre: string;

  descripcion: string;
  peso: number;
  largo: number;
  ancho: number;
  alto: number;

  costo: CostoEnvio;
  pago?: PagoEnvio;
}

// ===============================
// Generar PDF
// ===============================
export function generarReciboPago(envio: EnvioRecibo): void {
  const doc = new jsPDF();

  const fecha = new Date().toLocaleString();
  const total = envio.costo.total.toFixed(2);

  const metodo = envio.pago?.metodo || "No especificado";
  const pagaCon = envio.pago?.pagaCon
    ? `$${envio.pago.pagaCon.toFixed(2)}`
    : "N/A";

  const cambio = envio.pago?.cambio
    ? `$${envio.pago.cambio.toFixed(2)}`
    : "N/A";

  const guia = envio.guia || "Aún no generada";

  // Encabezado
  doc.setFontSize(18);
  doc.text("TELETRANSPORTER", 14, 20);

  doc.setFontSize(14);
  doc.text("RECIBO DE PAGO", 14, 30);
  doc.text(`Fecha: ${fecha}`, 14, 38);

  // ===============================
  // Datos del pago
  // ===============================
  autoTable(doc, {
    startY: 50,
    head: [["Campo", "Valor"]],
    body: [
      ["Cliente", envio.remitenteNombre],
      ["Método de pago", metodo],
      ["Total del envío", `$${total}`],
      ["Pagó con", pagaCon],
      ["Cambio", cambio],
      ["Número de guía", guia],
    ]
  });

  // ===============================
  // Detalle del envío
  // ===============================
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [["Detalle del envío", ""]],
    body: [
      ["Contenido", envio.descripcion],
      ["Peso", `${envio.peso} kg`],
      ["Dimensiones", `${envio.largo} x ${envio.ancho} x ${envio.alto} cm`],
      ["Paquetes", envio.costo.cantidadPaquetes],
    ]
  });

  // Firma
  doc.setFontSize(12);
  doc.text(
    "Firma del operador: ___________________________",
    14,
    (doc as any).lastAutoTable.finalY + 30
  );

  // Guardar PDF
  doc.save(`Recibo_${fecha.replace(/[:/ ]/g, "_")}.pdf`);
}
