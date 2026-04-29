import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import MetodoPagoSelector from "./MetodoPagoSelector";

export default function PagoSelectorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [envio, setEnvio] = useState(null);
  const [metodo, setMetodo] = useState("");

  useEffect(() => {
    api.get(`/envios/${id}/completo`).then((res) => {
      const e = res.data;
      setEnvio(e);

      // ❌ Si NO es pago en destino → regresar al flujo normal
      if (!e.pago_destino) {
        navigate(`/envios/${id}`);
      }
    });
  }, [id]);

  const seleccionar = (m) => {
    setMetodo(m);

    // ✔ Enviar método a PagoForm
    navigate(`/pagos/${id}`, {
      state: { envio, metodoPago: m },
    });
  };

  if (!envio) return <div>Cargando...</div>;

  return (
    <MetodoPagoSelector metodo={metodo} onSelect={seleccionar} />
  );
}
