import { useState } from "react";

interface PagoTarjetaProps {
  data: {
    banco?: string;
    ultimos4?: string;
    tipo?: string;
  };
  onChange: (data: any) => void;
}

export function PagoTarjeta({ data, onChange }: PagoTarjetaProps) {
  const [form, setForm] = useState({
    banco: data.banco || "",
    ultimos4: data.ultimos4 || "",
    tipo: data.tipo || "",
  });

  function update(field: string, value: string) {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onChange({ ...updated, metodo: "tarjeta" });
  }

  return (
    <div className="card">
      <h3>Pago con Tarjeta</h3>

      {/* Banco */}
      <div className="input-group">
        <label>Banco</label>
        <input
          placeholder="Ej. BBVA, Santander, Banorte"
          value={form.banco}
          onChange={(e) => update("banco", e.target.value)}
        />
      </div>

      {/* Últimos 4 dígitos */}
      <div className="input-group">
        <label>Últimos 4 dígitos</label>
        <input
          type="number"
          placeholder="1234"
          value={form.ultimos4}
          onChange={(e) =>
            update("ultimos4", e.target.value.slice(0, 4))
          }
        />
      </div>

      {/* Tipo de tarjeta */}
      <div className="input-group">
        <label>Tipo de tarjeta</label>
        <select
          value={form.tipo}
          onChange={(e) => update("tipo", e.target.value)}
        >
          <option value="">Selecciona tipo</option>
          <option value="debito">Débito</option>
          <option value="credito">Crédito</option>
        </select>
      </div>
    </div>
  );
}