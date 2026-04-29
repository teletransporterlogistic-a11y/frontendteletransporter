import QRCode from "qrcode";

export async function generarQR(texto) {
  try {
    const dataURL = await QRCode.toDataURL(texto, {
      width: 300,
      margin: 1,
    });
    return dataURL;
  } catch (err) {
    console.error("Error generando QR:", err);
    return null;
  }
}