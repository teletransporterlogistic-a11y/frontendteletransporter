import { useRoles } from "../../hooks/roles/useRoles";
import { Link } from "react-router-dom";

export default function RolesList() {
  const { data, isLoading } = useRoles();

  return (
    <div>
      <h1>Roles</h1>

      <Link to="/roles/nuevo" className="btn-primary">
        Nuevo Rol
      </Link>

      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tenant</th>
              <th>Permisos</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data?.map((r) => (
              <tr key={r.id}>
                <td>{r.nombre}</td>
                <td>{r.tenant}</td>
                <td>{r.permiso.length}</td>
                <td>
                  <Link to={`/roles/editar/${r.id}`}>Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
