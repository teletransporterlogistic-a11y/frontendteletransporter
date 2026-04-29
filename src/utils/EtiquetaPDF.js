import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { generarQR } from "./GenerarQR";

export async function generarEtiquetaPDF(envio) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: [100, 150] });

  const guia = envio.guia || "SIN GUIA";
  const fecha = new Date().toLocaleString();

  const qr = await generarQR(guia);

  doc.setFontSize(16);
  doc.text("TELETRANSPORTER", 10, 10);

  doc.setFontSize(12);
  doc.text(`Guía: ${guia}`, 10, 20);
  doc.text(`Fecha: ${fecha}`, 10, 26);

  if (qr) {
    doc.addImage(qr, "PNG", 60, 10, 30, 30);
  }

  autoTable(doc, {
    startY: 45,
    head: [["Remitente", ""]],
    body: [
      ["Nombre", envio.remitenteNombre],
      ["RFC", envio.remitenteRFC || "No registrado"],
      ["Correo", envio.remitenteCorreo || "No registrado"],
      ["Celular", envio.remitenteCelular || envio.remitenteTelefono || "No registrado"],
      ["Ciudad", envio.remitenteCiudad],
      ["Estado", envio.remitenteEstado],
      ["CP", envio.remitenteCP],
    ],
    theme: "grid",
    styles: { fontSize: 10 },
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 5,
    head: [["Destinatario", ""]],
    body: [
      ["Nombre", envio.destinatarioNombre],
      ["RFC", envio.destinatarioRFC || "No registrado"],
      ["Correo", envio.destinatarioCorreo || "No registrado"],
      ["Celular", envio.destinatarioCelular || envio.destinatarioTelefono || "No registrado"],
      ["Ciudad", envio.destinatarioCiudad],
      ["Estado", envio.destinatarioEstado],
      ["CP", envio.destinatarioCP],
    ],
    theme: "grid",
    styles: { fontSize: 10 },
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 5,
    head: [["Datos del Envío", ""]],
    body: [
      ["Contenido", envio.descripcion],
      ["Peso", `${envio.peso} kg`],
      ["Dimensiones", `${envio.largo} x ${envio.ancho} x ${envio.alto} cm`],
      ["Paquetes", envio.costo.cantidadPaquetes],
    ],
    theme: "grid",
    styles: { fontSize: 10 },
  });

  doc.save(`Etiqueta_${guia}.pdf`);
}