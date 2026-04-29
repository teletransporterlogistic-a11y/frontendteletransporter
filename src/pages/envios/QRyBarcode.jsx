import React from "react";

export function QRyBarcode({ envio }) {
  if (!envio) return null;

  const qrSrc = envio.qrBase64
    ? `data:image/png;base64,${envio.qrBase64}`
    : null;

  const barcodeSrc = envio.barcodeBase64
    ? `data:image/png;base64,${envio.barcodeBase64}`
    : null;

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "1rem",
      }}
    >
      {/* QR */}
      <div style={{ textAlign: "center" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>QR</h3>

        {qrSrc ? (
          <img
            src={qrSrc}
            alt="QR"
            style={{
              width: 180,
              height: 180,
              border: "1px solid #ddd",
              borderRadius: 8,
              background: "#fff",
              objectFit: "contain",
            }}
          />
        ) : (
          <div style={{ width: 180, height: 180 }}>Cargando QR...</div>
        )}
      </div>

      {/* Código de barras */}
      <div style={{ textAlign: "center" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Código de barras</h3>

        {barcodeSrc ? (
          <img
            src={barcodeSrc}
            alt="Barcode"
            style={{
              width: 300,
              height: 100,
              border: "1px solid #ddd",
              borderRadius: 8,
              background: "#fff",
              objectFit: "contain",
            }}
          />
        ) : (
          <div style={{ width: 300, height: 100 }}>Cargando código...</div>
        )}
      </div>
    </div>
  );
}
