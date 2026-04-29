import { usePermisosByRol } from "../../hooks/permisos/usePermisosByRol";
import { addPermiso, removePermiso } from "../../services/permisos.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const PERMISOS_CATALOGO = {
  envios: ["envios.ver", "envios.crear", "envios.editar", "envios.cancelar", "envios.asignar", "envios.rastrear"],
  incidencias: ["incidencias.ver", "incidencias.crear", "incidencias.resolver"],
  rutas: ["rutas.ver", "rutas.crear", "rutas.editar", "rutas.asignar"],
  unidades: ["unidades.ver", "unidades.crear", "unidades.editar"],
  vehiculos: ["vehiculos.ver", "vehiculos.crear", "vehiculos.editar"],
  centros: ["centros.ver", "centros.crear", "centros.editar"],
  usuarios: ["usuarios.ver", "usuarios.crear", "usuarios.editar"],
  roles: ["roles.ver", "roles.crear", "roles.editar", "roles.permisos"],
};

export default function PermisosMatrix({ rolId }) {
  const qc = useQueryClient();
  const { data: permisos, isLoading } = usePermisosByRol(rolId);

  const [error, setError] = useState("");

  const add = useMutation({
    mutationFn: ({ accion }) => addPermiso(rolId, accion),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["permisos", rolId] }),
    onError: (err) => setError(err.message || "Error al agregar permiso"),
  });

  const remove = useMutation({
    mutationFn: (permisoId) => removePermiso(permisoId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["permisos", rolId] }),
    onError: (err) => setError(err.message || "Error al eliminar permiso"),
  });

  // SUPERADMIN PROTEGIDO
  const SUPERADMIN_ID = 1;
  const isSuperAdmin = rolId === SUPERADMIN_ID;

  const permisosSet = new Set(permisos?.map((p) => p.accion));

  const toggle = (accion) => {
    if (isSuperAdmin) return; // SUPERADMIN NO SE TOCA

    const permiso = permisos?.find((p) => p.accion === accion);
    if (permiso) remove.mutate(permiso.id);
    else add.mutate({ accion });
  };

  if (isLoading) return <p>Cargando permisos...</p>;

  return (
    <div className="permisos-matrix space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      {Object.entries(PERMISOS_CATALOGO).map(([modulo, acciones]) => (
        <div key={modulo} className="permiso-modulo border p-3 rounded">
          <h3 className="font-bold mb-2">{modulo.toUpperCase()}</h3>

          {acciones.map((accion) => (
            <label key={accion} className="permiso-item flex items-center gap-2">
              <input
                type="checkbox"
                checked={permisosSet.has(accion)}
                disabled={isSuperAdmin || add.isPending || remove.isPending}
                onChange={() => toggle(accion)}
              />
              {accion}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
