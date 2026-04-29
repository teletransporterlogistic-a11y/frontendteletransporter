import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generarFacturaPDF(factura) {
  const { folio, fecha, cliente, envio, costos } = factura;

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("TELETRANSPORTER", 14, 20);

  doc.setFontSize(14);
  doc.text("Factura de Envío", 14, 30);
  doc.text(`Folio: ${folio}`, 14, 40);
  doc.text(`Fecha: ${fecha}`, 14, 48);

  autoTable(doc, {
    startY: 60,
    head: [["Campo", "Valor"]],
    body: [
      ["Nombre", cliente.nombre],
      ["RFC", cliente.rfc || "No registrado"],
      ["Correo", cliente.correo || "No registrado"],
      ["Celular", cliente.celular || "No registrado"],
      ["Razón Social", cliente.razonSocial || "No registrada"],
      ["Domicilio Fiscal", cliente.domicilioFiscal || "No registrado"],
    ],
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Campo", "Valor"]],
    body: [
      ["Contenido", envio.descripcion],
      ["Peso", `${envio.peso} kg`],
      ["Dimensiones", envio.dimensiones],
      ["Número de guía", costos.guia || "SIN GUIA"],
    ],
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Concepto", "Monto"]],
    body: [
      ["Subtotal", `$${costos.subtotal.toFixed(2)}`],
      ["Descuento", `${costos.descuentoAplicado}%`],
      ["Subtotal con descuento", `$${costos.subtotalConDescuento.toFixed(2)}`],
      ["IVA 16%", `$${costos.iva.toFixed(2)}`],
      ["Retención IVA 4%", `$${costos.retencion.toFixed(2)}`],
      ["Total unitario", `$${costos.totalUnitario.toFixed(2)}`],
      ["Cantidad de paquetes", `${costos.cantidadPaquetes}`],
      ["Total", `$${costos.total.toFixed(2)}`],
    ],
  });

  doc.save(`Factura_${folio}.pdf`);
}