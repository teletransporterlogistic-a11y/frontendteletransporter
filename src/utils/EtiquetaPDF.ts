// src/utils/EtiquetaPDF.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { generarQR } from "./GenerarQR";

// ===============================
// Tipos
// ===============================
export interface EnvioEtiqueta {
  guia?: string;

  remitenteNombre: string;
  remitenteRFC?: string;
  remitenteCorreo?: string;
  remitenteCelular?: string;
  remitenteTelefono?: string;
  remitenteCiudad: string;
  remitenteEstado: string;
  remitenteCP: string;

  destinatarioNombre: string;
  destinatarioRFC?: string;
  destinatarioCorreo?: string;
  destinatarioCelular?: string;
  destinatarioTelefono?: string;
  destinatarioCiudad: string;
  destinatarioEstado: string;
  destinatarioCP: string;

  descripcion: string;
  peso: number;
  largo: number;
  ancho: number;
  alto: number;

  costo: {
    cantidadPaquetes: number;
  };
}

// ===============================
// Generar PDF
// ===============================
export async function generarEtiquetaPDF(envio: EnvioEtiqueta): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [100, 150] // tamaño etiqueta
  });

  const guia = envio.guia || "SIN GUIA";
  const fecha = new Date().toLocaleString();

  // QR
  const qr = await generarQR(guia);

  // Encabezado
  doc.setFontSize(16);
  doc.text("TELETRANSPORTER", 10, 10);

  doc.setFontSize(12);
  doc.text(`Guía: ${guia}`, 10, 20);
  doc.text(`Fecha: ${fecha}`, 10, 26);

  if (qr) {
    doc.addImage(qr, "PNG", 60, 10, 30, 30);
  }

  // ===============================
  // Remitente
  // ===============================
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
    styles: { fontSize: 10 }
  });

  // ===============================
  // Destinatario
  // ===============================
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 5,
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
    styles: { fontSize: 10 }
  });

  // ===============================
  // Datos del envío
  // ===============================
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 5,
    head: [["Datos del Envío", ""]],
    body: [
      ["Contenido", envio.descripcion],
      ["Peso", `${envio.peso} kg`],
      ["Dimensiones", `${envio.largo} x ${envio.ancho} x ${envio.alto} cm`],
      ["Paquetes", envio.costo.cantidadPaquetes],
    ],
    theme: "grid",
    styles: { fontSize: 10 }
  });

  // Guardar PDF
  doc.save(`Etiqueta_${guia}.pdf`);
}
