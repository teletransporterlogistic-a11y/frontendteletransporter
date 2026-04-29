import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generarCartaPorte(envio) {
  const doc = new jsPDF();

  const fecha = new Date().toLocaleString();
  const guia = envio.guia || "SIN GUIA";

  doc.setFontSize(18);
  doc.text("TELETRANSPORTER", 14, 20);

  doc.setFontSize(14);
  doc.text("CARTA PORTE", 14, 30);
  doc.text(`Fecha: ${fecha}`, 14, 38);
  doc.text(`Guía: ${guia}`, 14, 46);

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

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
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

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Datos del Envío", ""]],
    body: [
      ["Contenido", envio.descripcion],
      ["Peso", `${envio.peso} kg`],
      ["Dimensiones", `${envio.largo} x ${envio.ancho} x ${envio.alto} cm`],
      ["Paquetes", envio.costo.cantidadPaquetes],
      ["Valor Declarado", `$${envio.valorDeclarado || 0}`],
    ],
  });

  doc.setFontSize(12);
  doc.text("Firma del operador: ___________________________", 14, doc.lastAutoTable.finalY + 30);

  doc.save(`CartaPorte_${guia}.pdf`);
}