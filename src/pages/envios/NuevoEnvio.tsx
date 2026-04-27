import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnvioForm from "../../components/envios/EnvioForm";
import ClienteSearchModal from "../../components/clientes/ClienteSearchModal";
import api from "../../api/api";

export default function NuevoEnvio() {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [callbackSeleccion, setCallbackSeleccion] =
    useState<null | ((c: any) => void)>(null);

  const [loading, setLoading] = useState(false);

  const handleBuscarRemitente = (callback: (cliente: any) => void) => {
    setCallbackSeleccion(() => callback);
    setModalOpen(true);
  };

  const handleBuscarDestinatario = (callback: (cliente: any) => void) => {
    setCallbackSeleccion(() => callback);
    setModalOpen(true);
  };

  const handleSelectCliente = (clienteCompleto: any) => {
    if (callbackSeleccion) callbackSeleccion(clienteCompleto);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const guardarEnvio = async (data: any) => {
    try {
      setLoading(true);

      // 🔥 LIMPIEZA: quitamos campos que NO existen en Prisma
      delete data.estadoActualId;
      delete data.operadorId;
      delete data.estadoDeEnvio;
      delete data.cliente;
      delete data.operador;

      // Aseguramos numéricos
      const envioAEnviar = {
        ...data,
        peso: Number(data.peso) || 0,
        largo: Number(data.largo) || 0,
        ancho: Number(data.ancho) || 0,
        alto: Number(data.alto) || 0,
        valorDeclarado: Number(data.valorDeclarado) || 0,
        cantidadPaquetes: Number(data.cantidadPaquetes) || 1,
      };

      const res = await api.post("/envios", envioAEnviar);
      const respuesta = res.data;

      // El servicio devuelve: { ok, mensaje, id, guia, costoBase, ... }
      if (!respuesta?.ok) {
        console.error("Error lógico al crear envío:", respuesta);
        alert(respuesta?.mensaje || "Error al crear envío");
        return;
      }

      // Navegamos a pagos con el envío recién creado
      navigate("/pagos/nuevo", {
        state: {
          envio: {
            id: respuesta.id,
            guia: respuesta.guia,
            costoTotal: respuesta.costoTotal,
            costoBase: respuesta.costoBase,
            costoServicios: respuesta.costoServicios,
            costoSeguro: respuesta.costoSeguro,
            descuento: respuesta.descuento,
            fechaPrometida: respuesta.fechaPrometida,
          },
        },
      });
    } catch (err: any) {
      console.error("Error al guardar envío:", err);
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Error al guardar envío"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Nuevo envío</h2>

      <EnvioForm
        onSubmit={guardarEnvio}
        onBuscarRemitente={handleBuscarRemitente}
        onBuscarDestinatario={handleBuscarDestinatario}
        loading={loading}
      />

      <ClienteSearchModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSelect={handleSelectCliente}
      />
    </>
  );
}
