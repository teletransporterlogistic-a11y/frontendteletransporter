import { useParams } from "react-router-dom";
import { useEntregaOcurre } from "../../hooks/entrega-ocurre/useEntregaOcurre";
import EntregaOcurreForm from "../../components/entrega-ocurre/EntregaOcurreForm";
import EntregaOcurreHistory from "../../components/entrega-ocurre/EntregaOcurreHistory";
import { useQuery } from "@tanstack/react-query";

export default function EntregaOcurrePage() {
  const { envioId } = useParams();
  const id = Number(envioId);

  const { data: envio } = useQuery({
    queryKey: ["envio", id],
    queryFn: async () => {
      const res = await fetch(`/api/envios/${id}`);
      return res.json();
    },
  });

  const { data: entregas } = useQuery({
    queryKey: ["entrega-ocurre", id],
    queryFn: async () => {
      const res = await fetch(`/api/envios/${id}/entrega-ocurre`);
      return res.json();
    },
  });

  const entregaMutation = useEntregaOcurre();

  if (!envio) return <div>Cargando...</div>;

  return (
    <div className="entrega-ocurre-layout">
      <h1>Entrega Ocurre — Envío #{id}</h1>

      <EntregaOcurreForm
        envio={envio}
        onSubmit={(data) => entregaMutation.mutate(data)}
      />

      <h2>Historial</h2>
      <EntregaOcurreHistory entregas={entregas ?? []} />
    </div>
  );
}
