import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generarReciboPago(envio) {
  const doc = new jsPDF();

  const fecha = new Date().toLocaleString();
  const total = envio.costo.total.toFixed(2);
  const metodo = envio.pago?.metodo || "No especificado";
  const pagaCon = envio.pago?.pagaCon ? `$${envio.pago.pagaCon.toFixed(2)}` : "N/A";
  const cambio = envio.pago?.cambio ? `$${envio.pago.cambio.toFixed(2)}` : "N/A";
  const guia = envio.guia || "Aún no generada";

  doc.setFontSize(18);
  doc.text("TELETRANSPORTER", 14, 20);

  doc.setFontSize(14);
  doc.text("RECIBO DE PAGO", 14, 30);
  doc.text(`Fecha: ${fecha}`, 14, 38);

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
    ],
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Detalle del envío", ""]],
    body: [
      ["Contenido", envio.descripcion],
      ["Peso", `${envio.peso} kg`],
      ["Dimensiones", `${envio.largo} x ${envio.ancho} x ${envio.alto} cm`],
      ["Paquetes", envio.costo.cantidadPaquetes],
    ],
  });

  doc.setFontSize(12);
  doc.text("Firma del operador: ___________________________", 14, doc.lastAutoTable.finalY + 30);

  doc.save(`Recibo_${fecha.replace(/[:/ ]/g, "_")}.pdf`);
}