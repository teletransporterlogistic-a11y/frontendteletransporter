import { useEffect, useState } from "react";

interface PagoEfectivoProps {
  total: number;
  data: any;
  onChange: (data: any) => void;
}

export function PagoEfectivo({ total, data, onChange }: PagoEfectivoProps) {
  const [montoRecibido, setMontoRecibido] = useState<number | "">(
    data.montoRecibido ?? ""
  );

  const cambio =
    montoRecibido === "" ? 0 : Math.max(0, Number(montoRecibido) - total);

  useEffect(() => {
    onChange({
      ...data,
      montoRecibido: montoRecibido === "" ? null : Number(montoRecibido),
      cambio,
      metodo: "efectivo",
    });
  }, [montoRecibido, total]);

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
          value={montoRecibido === "" ? "" : montoRecibido}
          onChange={(e) => {
            const v = e.target.value;
            setMontoRecibido(v === "" ? "" : Number(v));
          }}
        />
      </div>

      <div className="line">
        <span>Cambio:</span>
        <strong>${cambio.toFixed(2)}</strong>
      </div>

      {montoRecibido !== "" && Number(montoRecibido) < total && (
        <p className="warning">El monto recibido es menor al total.</p>
      )}
    </div>
  );
}
