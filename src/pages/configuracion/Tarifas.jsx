import { useState } from "react";

export default function Tarifas() {
  const [tarifas, setTarifas] = useState([
    { max: 5, precio: 120 },
    { max: 10, precio: 157 },
    { max: 20, precio: 204 },
    { max: 30, precio: 243 },
    { max: 40, precio: 308 },
    { max: 50, precio: 418 },
    { max: 60, precio: 550 },
  ]);

  // ============================
  // CALCULAR TARIFA
  // ============================
  function calcularTarifa(peso, volumenM3) {
    if (peso > 60) {
      const excedente = peso - 60;
      return 550 + excedente * 22;
    }

    const tarifa = tarifas.find((t) => peso <= t.max);
    const costoVolumen = volumenM3 * 2120;

    return Math.max(tarifa?.precio || 0, costoVolumen);
  }

  // ============================
  // ACTUALIZAR TARIFA
  // ============================
  const updateTarifa = (i, field, value) => {
    const copy = [...tarifas];
    copy[i][field] = Number(value);
    setTarifas(copy);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tarifas y Precios</h1>

      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Tarifas por Peso</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Hasta (kg)</th>
              <th className="p-2">Precio ($)</th>
            </tr>
          </thead>

          <tbody>
            {tarifas.map((t, i) => (
              <tr key={i}>
                <td className="p-2">
                  <input
                    type="number"
                    value={t.max}
                    onChange={(e) => updateTarifa(i, "max", e.target.value)}
                    className="input"
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    value={t.precio}
                    onChange={(e) => updateTarifa(i, "precio", e.target.value)}
                    className="input"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn-primary mt-4">Guardar Tarifas</button>
      </div>
    </div>
  );
}