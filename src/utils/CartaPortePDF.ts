// src/utils/CartaPortePDF.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ===============================
// Tipos
// ===============================
export interface EnvioCartaPorte {
  guia?: string;

  remitenteNombre: string;
  remitenteRFC?: string;
  remitenteCorreo?: string;
  remitenteCelular?: string;
  remitenteTelefono?: string;
  remitenteCalle: string;
  remitenteNumero: string;
  remitenteColonia: string;
  remitenteCiudad: string;
  remitenteEstado: string;
  remitenteCP: string;

  destinatarioNombre: string;
  destinatarioRFC?: string;
  destinatarioCorreo?: string;
  destinatarioCelular?: string;
  destinatarioTelefono?: string;
  destinatarioCalle: string;
  destinatarioNumero: string;
  destinatarioColonia: string;
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

  valorDeclarado?: number;
}

// ===============================
// Generar PDF
// ===============================
export function generarCartaPorte(envio: EnvioCartaPorte): void {
  const doc = new jsPDF();

  const fecha = new Date().toLocaleString();
  const guia = envio.guia || "SIN GUIA";

  // Encabezado
  doc.setFontSize(18);
  doc.text("TELETRANSPORTER", 14, 20);

  doc.setFontSize(14);
  doc.text("CARTA PORTE", 14, 30);
  doc.text(`Fecha: ${fecha}`, 14, 38);
  doc.text(`Guía: ${guia}`, 14, 46);

  // ===============================
  // Remitente
  // ===============================
  autoTable(doc, {
    startY: 60,
    head: [["Datos del Remitente", ""]],
    body: [
      ["Nombre", envio.remitenteNombre],
      ["RFC", envio.remitenteRFC || "No registrado"],
      ["Correo", envio.remitenteCorreo || "No registrado"],
      ["Celular", envio.remitenteCelular || envio.remitenteTelefono || "No registrado"],
      ["Dirección", `${envio.remitenteCalle} ${envio.remitenteNumero}, ${envio.remitenteColonia}`],
      ["Ciudad", `${envio.remitenteCiudad}, ${envio.remitenteEstado}`],
      ["Código Postal", envio.remitenteCP],
    ],
  });

  // ===============================
  // Destinatario
  // ===============================
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [["Datos del Destinatario", ""]],
    body: [
      ["Nombre", envio.destinatarioNombre],
      ["RFC", envio.destinatarioRFC || "No registrado"],
      ["Correo", envio.destinatarioCorreo || "No registrado"],
      ["Celular", envio.destinatarioCelular || envio.destinatarioTelefono || "No registrado"],
      ["Dirección", `${envio.destinatarioCalle} ${envio.destinatarioNumero}, ${envio.destinatarioColonia}`],
      ["Ciudad", `${envio.destinatarioCiudad}, ${envio.destinatarioEstado}`],
      ["Código Postal", envio.destinatarioCP],
    ],
  });

  // ===============================
  // Datos del envío
  // ===============================
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [["Datos del Envío", ""]],
    body: [
      ["Contenido", envio.descripcion],
      ["Peso", `${envio.peso} kg`],
      ["Dimensiones", `${envio.largo} x ${envio.ancho} x ${envio.alto} cm`],
      ["Paquetes", envio.costo.cantidadPaquetes],
      ["Valor Declarado", `$${envio.valorDeclarado || 0}`],
    ],
  });

  // Firma
  doc.setFontSize(12);
  doc.text(
    "Firma del operador: ___________________________",
    14,
    (doc as any).lastAutoTable.finalY + 30
  );

  // Guardar PDF
  doc.save(`CartaPorte_${guia}.pdf`);
}
