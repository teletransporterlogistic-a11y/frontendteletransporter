// src/pages/entrega-ocurre/EntregaOcurrePage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EntregaOcurreForm from "@/components/entrega-ocurre/EntregaOcurreForm";
import EntregaOcurreHistory from "@/components/entrega-ocurre/EntregaOcurreHistory";
import { useEntregaOcurre } from "@/hooks/entrega-ocurre/useEntregaOcurre";

// ===============================
// Tipos
// ===============================
interface Envio {
  id: number;
  clienteId: number;
  cliente?: { nombre: string };
}

interface EntregaOcurre {
  id: number;
  fecha: string;
  nombreRecibe: string;
  documentoId: string;
  operadorNombre: string;
}

// ===============================
// Componente
// ===============================
export default function EntregaOcurrePage() {
  const { envioId } = useParams<{ envioId: string }>();
  const navigate = useNavigate();

  const id = Number(envioId);
  if (isNaN(id)) {
    return <div className="card">ID inválido</div>;
  }

  // ===============================
  // Queries
  // ===============================
  const envioQuery = useQuery<Envio>({
    queryKey: ["envio", id],
    queryFn: async () => {
      const res = await fetch(`/api/envios/${id}`);
      return res.json();
    }
  });

  const entregasQuery = useQuery<EntregaOcurre[]>({
    queryKey: ["entrega-ocurre", id],
    queryFn: async () => {
      const res = await fetch(`/api/envios/${id}/entrega-ocurre`);
      return res.json();
    }
  });

  const entregaMutation = useEntregaOcurre();

  // ===============================
  // Loading / Error
  // ===============================
  if (envioQuery.isLoading || entregasQuery.isLoading) {
    return <div className="card">Cargando...</div>;
  }

  if (!envioQuery.data) {
    return <div className="card">Envío no encontrado</div>;
  }

  const envio = envioQuery.data;
  const entregas = entregasQuery.data ?? [];

  // ===============================
  // Render
  // ===============================
  return (
    <div className="entrega-ocurre-layout">
      <button className="btn-secondary" onClick={() => navigate(-1)}>
        ← Regresar
      </button>

      <h1>Entrega Ocurre — Envío #{envio.id}</h1>

      {/* FORMULARIO */}
      <EntregaOcurreForm
        envio={envio}
        onSubmit={(data) =>
          entregaMutation.mutate(
            { ...data, envioId: envio.id, clienteId: envio.clienteId },
            {
              onSuccess: () => {
                alert("Entrega registrada");
                entregasQuery.refetch();
              },
              onError: () => {
                alert("Error al registrar entrega");
              }
            }
          )
        }
      />

      {/* HISTORIAL */}
      <h2>Historial</h2>
      <EntregaOcurreHistory entregas={entregas} />
    </div>
  );
}
