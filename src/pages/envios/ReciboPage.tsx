import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function ReciboPage() {
  const { id } = useParams();
  const location = useLocation() as { state?: { envio?: any } };
  const [envio, setEnvio] = useState<any | null>(location.state?.envio ?? null);

  useEffect(() => {
    if (envio) return;
    async function fetchEnvio() {
      try {
        const res = await api.get(`/envios/${id}/completo`);
        setEnvio(res.data);
      } catch (err) {
        console.error("Error cargando envío:", err);
      }
    }
    if (id) fetchEnvio();
  }, [id, envio]);

  if (!envio) return <div>Cargando recibo...</div>;

  const pago = envio.pagos?.[0];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Recibo de pago</h2>

      <div className="bg-white shadow rounded p-4 mb-6 max-w-xl">
        <div className="mb-2">
          <span className="font-semibold">Guía:</span> {envio.guia}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Cliente:</span>{" "}
          {envio.cliente?.nombre}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Método de pago:</span>{" "}
          {envio.metodoPago ?? "N/A"}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Costo total:</span>{" "}
          ${envio.costoTotal?.toFixed(2)}
        </div>

        {pago && (
          <>
            <div className="mt-4 mb-1 font-semibold">Detalle del pago</div>
            <div className="mb-1">
              <span className="font-semibold">Fecha:</span>{" "}
              {new Date(pago.fecha).toLocaleString()}
            </div>
            <div className="mb-1">
              <span className="font-semibold">Monto:</span>{" "}
              ${pago.monto?.toFixed(2)}
            </div>
            <div className="mb-1">
              <span className="font-semibold">Referencia:</span>{" "}
              {pago.referencia}
            </div>
          </>
        )}
      </div>

      <button
        onClick={() =>
          window.open(`/api/envios/${envio.id}/recibo/pdf`, "_blank")
        }
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Imprimir recibo PDF
      </button>
    </div>
  );
}
