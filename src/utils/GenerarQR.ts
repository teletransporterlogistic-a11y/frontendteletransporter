// src/utils/GenerarQR.ts
import QRCode from "qrcode";

// ===============================
// Tipos
// ===============================
export async function generarQR(texto: string): Promise<string | null> {
  try {
    const dataURL = await QRCode.toDataURL(texto, {
      width: 300,
      margin: 1
    });

    return dataURL;
  } catch (err) {
    console.error("Error generando QR:", err);
    return null;
  }
}
