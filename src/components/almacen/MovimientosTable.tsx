import { AlmacenMovimiento } from "../../types/almacen";

export default function MovimientosTable({ movimientos }: { movimientos: AlmacenMovimiento[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Detalle</th>
          <th>Operador</th>
          <th>GPS</th>
          <th>Fecha</th>
        </tr>
      </thead>

      <tbody>
        {movimientos.map((m) => (
          <tr key={m.id}>
            <td>{m.tipo}</td>
            <td>{m.detalle ?? "—"}</td>
            <td>{m.operador?.nombre ?? "—"}</td>
            <td>
              {(m.lat && m.lng)
                ? `${m.lat}, ${m.lng}`
                : "—"}
            </td>
            <td>{new Date(m.creadoEn).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
