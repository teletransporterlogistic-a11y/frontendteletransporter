export default function EntregaOcurreHistory({ entregas }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Recibió</th>
          <th>Documento</th>
          <th>Operador</th>
        </tr>
      </thead>

      <tbody>
        {entregas.map((e) => (
          <tr key={e.id}>
            <td>{new Date(e.creadoEn).toLocaleString()}</td>
            <td>{e.nombreRecibe}</td>
            <td>{e.documentoId ?? "—"}</td>
            <td>{e.operador?.nombre ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
