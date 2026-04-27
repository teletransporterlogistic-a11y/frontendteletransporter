export function DomiciliosAdicionales({ domicilios, actualizar, eliminar }) {
  return (
    <div className="domicilios-table-wrapper">
      <table className="domicilios-table">
        <thead>…</thead>

        <tbody>
          {domicilios.map((d, i) => (
            <tr key={i}>
              <td>
                <select
                  value={d.tipoDomicilio}
                  onChange={(e) => actualizar(i, "tipoDomicilio", e.target.value)}
                >
                  <option value="">Selecciona</option>
                  <option value="FISCAL">FISCAL</option>
                  <option value="ENTREGA">ENTREGA</option>
                  <option value="SUCURSAL">SUCURSAL</option>
                  <option value="OTRO">OTRO</option>
                </select>
              </td>

              <td>
                <input
                  value={d.nombre}
                  onChange={(e) => actualizar(i, "nombre", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={d.calle}
                  onChange={(e) => actualizar(i, "calle", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={d.numero}
                  onChange={(e) => actualizar(i, "numero", e.target.value)}
                />
              </td>

              <td>
                <input
                  maxLength={5}
                  value={d.codigoPostal}
                  onChange={(e) => actualizar(i, "codigoPostal", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={d.colonia}
                  onChange={(e) => actualizar(i, "colonia", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={d.ciudad}
                  onChange={(e) => actualizar(i, "ciudad", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={d.estado}
                  onChange={(e) => actualizar(i, "estado", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={d.municipioId}
                  onChange={(e) => actualizar(i, "municipioId", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={d.celular}
                  onChange={(e) => actualizar(i, "celular", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={d.telefono2}
                  onChange={(e) => actualizar(i, "telefono2", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={d.correo}
                  onChange={(e) => actualizar(i, "correo", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={d.email}
                  onChange={(e) => actualizar(i, "email", e.target.value)}
                />
              </td>

              <td>
                <button type="button" className="btn-danger" onClick={() => eliminar(i)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
