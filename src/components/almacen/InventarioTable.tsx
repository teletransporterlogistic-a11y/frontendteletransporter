import { Link } from "react-router-dom";

export default function InventarioTable({ inventario }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Envío</th>
          <th>Estado</th>
          <th>Ubicación</th>
          <th>Centro Operativo</th>
          <th>Actualizado</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {inventario.map((i) => (
          <tr key={i.id}>
            <td>#{i.envioId}</td>
            <td>{i.estado}</td>
            <td>{i.ubicacion ?? "—"}</td>
            <td>{i.centroOperativo?.nombre ?? "—"}</td>
            <td>{new Date(i.actualizadoEn).toLocaleString()}</td>
            <td>
              <Link to={`/almacen/movimientos/${i.envioId}`}>
                Ver movimientos
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
