// src/pages/centros/CentroOperativoPage.tsx
import { useState } from "react";

import { useCentrosOperativos } from "@/hooks/centros/useCentrosOperativos";
import { useCreateCentroOperativo } from "@/hooks/centros/useCreateCentroOperativo";
import { useUpdateCentroOperativo } from "@/hooks/centros/useUpdateCentroOperativo";
import { useDeleteCentroOperativo } from "@/hooks/centros/useDeleteCentroOperativo";

import CentroOperativoForm from "@/components/centros/CentroOperativoForm";

interface CentroOperativo {
  id: number;
  nombre: string;
  ciudad: string;
  estado: string;
  direccion: string;
  activo: boolean;
}

export default function CentroOperativoPage() {
  const [modo, setModo] = useState<"lista" | "crear" | "editar">("lista");
  const [seleccionado, setSeleccionado] = useState<CentroOperativo | null>(null);

  const { data, isLoading } = useCentrosOperativos({ page: 1, pageSize: 999 });
  const crear = useCreateCentroOperativo();
  const actualizar = useUpdateCentroOperativo(seleccionado?.id ?? 0);
  const eliminar = useDeleteCentroOperativo();

  // ===============================
  // Handlers
  // ===============================
  const onCrear = (form: any) => {
    crear.mutate(form, {
      onSuccess: () => {
        setModo("lista");
      }
    });
  };

  const onActualizar = (form: any) => {
    if (!seleccionado) return;
    actualizar.mutate(form, {
      onSuccess: () => {
        setModo("lista");
        setSeleccionado(null);
      }
    });
  };

  const onEliminar = (id: number) => {
    if (!confirm("¿Eliminar centro operativo?")) return;
    eliminar.mutate(id);
  };

  // ===============================
  // Render
  // ===============================
  if (isLoading) {
    return <div>Cargando centros operativos...</div>;
  }

  // ===============================
  // Modo: Crear
  // ===============================
  if (modo === "crear") {
    return (
      <div className="centros-layout">
        <h1>Nuevo Centro Operativo</h1>

        <CentroOperativoForm
          form={{}}
          errors={{}}
          updateField={() => {}}
          onSubmit={onCrear}
          loading={crear.isPending}
        />

        <button className="btn-secondary" onClick={() => setModo("lista")}>
          Cancelar
        </button>
      </div>
    );
  }

  // ===============================
  // Modo: Editar
  // ===============================
  if (modo === "editar" && seleccionado) {
    return (
      <div className="centros-layout">
        <h1>Editar Centro Operativo</h1>

        <CentroOperativoForm
          form={seleccionado}
          errors={{}}
          updateField={() => {}}
          onSubmit={onActualizar}
          loading={actualizar.isPending}
        />

        <button
          className="btn-secondary"
          onClick={() => {
            setModo("lista");
            setSeleccionado(null);
          }}
        >
          Cancelar
        </button>
      </div>
    );
  }

  // ===============================
  // Modo: Lista
  // ===============================
  return (
    <div className="centros-layout">
      <div className="header-row">
        <h1>Centros Operativos</h1>

        <button className="btn-primary" onClick={() => setModo("crear")}>
          Nuevo Centro
        </button>
      </div>

      <table className="tabla-centros">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Estado</th>
            <th>Dirección</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((c: CentroOperativo) => (
            <tr key={c.id}>
              <td>{c.nombre}</td>
              <td>{c.ciudad}</td>
              <td>{c.estado}</td>
              <td>{c.direccion}</td>
              <td>{c.activo ? "Sí" : "No"}</td>

              <td>
                <button
                  className="btn-small"
                  onClick={() => {
                    setSeleccionado(c);
                    setModo("editar");
                  }}
                >
                  Editar
                </button>

                <button
                  className="btn-small btn-danger"
                  onClick={() => onEliminar(c.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {data?.data?.length === 0 && (
            <tr>
              <td colSpan={6}>No hay centros operativos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
