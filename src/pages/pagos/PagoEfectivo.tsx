import { useEffect, useState } from "react";

export function PagoEfectivo({ total, data, onChange }) {
  const [montoRecibido, setMontoRecibido] = useState(data.montoRecibido || "");

  // Cálculo automático del cambio
  const cambio = montoRecibido ? Math.max(0, montoRecibido - total) : 0;

  useEffect(() => {
    onChange({
      ...data,
      montoRecibido,
      cambio,
      metodo: "efectivo",
    });
  }, [montoRecibido]);

  return (
    <div className="card">
      <h3>Pago en Efectivo</h3>

      <div className="line">
        <span>Total a pagar:</span>
        <strong>${total.toFixed(2)}</strong>
      </div>

      <div className="input-group">
        <label>Monto recibido</label>
        <input
          type="number"
          placeholder="Ingresa el monto recibido"
          value={montoRecibido}
          onChange={(e) => setMontoRecibido(Number(e.target.value))}
        />
      </div>

      <div className="line">
        <span>Cambio:</span>
        <strong>${cambio.toFixed(2)}</strong>
      </div>

      {montoRecibido < total && montoRecibido !== "" && (
        <p className="warning">El monto recibido es menor al total.</p>
      )}
    </div>
  );
}