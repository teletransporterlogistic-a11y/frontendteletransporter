// src/pages/entregas/EntregaProceso.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import api from "@/api/api";
import BotonRegresar from "@/components/BotonRegresar";
import "./EntregaProceso.css";

// ===============================
// Tipos
// ===============================
interface ClienteSeleccionado {
  id: number;
  nombre: string;
}

interface EnvioCompleto {
  id: number;
  guia: string;
  remitenteNombre: string;
  destinatarioNombre: string;
  destinatarioCiudad: string;
  destinatarioEstado: string;
  peso: number;
  pago_destino: boolean;
}

interface RouteParams {
  id?: string;
}

// ===============================
// Componente
// ===============================
export default function EntregaProceso() {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const location = useLocation();

  const [envio, setEnvio] = useState<EnvioCompleto | null>(null);
  const [clienteSeleccionado, setClienteSeleccionado] =
    useState<ClienteSeleccionado | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  // ===============================
  // Si venimos de seleccionar cliente
  // ===============================
  useEffect(() => {
    if (location.state?.clienteSeleccionado) {
      setClienteSeleccionado(location.state.clienteSeleccionado);
    }
  }, [location.state]);

  // ===============================
  // Cargar datos del envío
  // ===============================
  useEffect(() => {
    async function cargarEnvio() {
      if (!id) return;

      try {
        const res = await api.get(`/envios/${id}/completo`);
        setEnvio(res);
      } catch (err) {
        console.error("Error cargando envío:", err);
      } finally {
        setCargando(false);
      }
    }

    cargarEnvio();
  }, [id]);

  // ===============================
  // ENTREGAR PAQUETE
  // ===============================
  async function entregarPaquete() {
    if (!envio) return;

    if (!clienteSeleccionado) {
      alert("Debes seleccionar o registrar un cliente para entregar.");
      return;
    }

    // FXC → Ir a pantalla de pago
    if (envio.pago_destino === true) {
      navigate(`/pagos/selector/${envio.id}`, {
        state: { envio, cliente: clienteSeleccionado }
      });
      return;
    }

    // PAG → Entregar directo
    try {
      await api.post(`/envios/${envio.id}/entregar`, {
        clienteId: clienteSeleccionado.id
      });

      // Recargar envío actualizado
      const actualizado = await api.get(`/envios/${envio.id}/completo`);

      // Navegar al recibo de entrega
      navigate(`/envios/recibo-entrega`, {
        state: { envio: actualizado, cliente: clienteSeleccionado }
      });
    } catch (err) {
      console.error("Error entregando paquete:", err);
      alert("No se pudo completar la entrega.");
    }
  }

  // ===============================
  // Render
  // ===============================
  if (cargando) {
    return <div className="loading">Cargando datos del envío...</div>;
  }

  if (!envio) {
    return <div className="error">No se encontró el envío.</div>;
  }

  return (
    <div className="entrega-proceso-wrapper">
      <BotonRegresar />

      <h2>Entrega de paquete</h2>

      {/* DATOS DEL ENVÍO */}
      <div className="card datos-envio">
        <h3>Datos del envío</h3>

        <p>
          <strong>Guía:</strong> {envio.guia}
        </p>
        <p>
          <strong>Cliente:</strong> {envio.remitenteNombre}
        </p>
        <p>
          <strong>Destinatario:</strong> {envio.destinatarioNombre}
        </p>
        <p>
          <strong>Ciudad destino:</strong> {envio.destinatarioCiudad},{" "}
          {envio.destinatarioEstado}
        </p>
        <p>
          <strong>Peso:</strong> {envio.peso} kg
        </p>
        <p>
          <strong>Tipo de pago:</strong>{" "}
          {envio.pago_destino
            ? "FXC (Paga el destinatario)"
            : "PAG (Pagado)"}
        </p>
      </div>

      {/* CLIENTE QUE RECIBE */}
      <div className="card verificacion">
        <h3>Cliente que recibe</h3>

        {clienteSeleccionado ? (
          <p className="ok">
            ✔ Cliente seleccionado:{" "}
            <strong>{clienteSeleccionado.nombre}</strong>
          </p>
        ) : (
          <p className="alerta">⚠ No se ha seleccionado cliente.</p>
        )}

        <div className="acciones-seleccion">
          <button
            className="btn-primary"
            onClick={() =>
              navigate("/clientes?selectMode=true", {
                state: { fromEntrega: envio.id }
              })
            }
          >
            Seleccionar cliente
          </button>

          <Link
            className="btn-secondary"
            to={`/clientes/nuevo?fromEntrega=${envio.id}&nombre=${envio.destinatarioNombre}`}
          >
            Registrar cliente nuevo
          </Link>
        </div>
      </div>

      {/* ACCIONES */}
      <div className="acciones-entrega">
        <button
          className="btn-primary btn-entregar"
          onClick={entregarPaquete}
          disabled={!clienteSeleccionado}
        >
          Entregar paquete
        </button>

        <button className="btn-secondary" onClick={() => navigate("/entregas")}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
