import { OperadorProductividad } from "../../types/almacenDashboard";

export default function OperadoresProductividadTable({
  operadores,
}: {
  operadores: OperadorProductividad[] | undefined;
}) {
  if (!operadores) return null;

  const sorted = [...operadores].sort(
    (a, b) => b.movimientos - a.movimientos
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Operador</th>
          <th>Movimientos</th>
          <th>Picking</th>
          <th>Packing</th>
          <th>Salidas</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((op) => (
          <tr key={op.operadorId}>
            <td>{op.nombre}</td>
            <td>{op.movimientos}</td>
            <td>{op.picking}</td>
            <td>{op.packing}</td>
            <td>{op.salidas}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
