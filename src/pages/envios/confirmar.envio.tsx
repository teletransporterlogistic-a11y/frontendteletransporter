// src/pages/envios/confirmar/ConfirmarEnvio.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "@/api/api";

import "./ConfirmarEnvio.css";

// ===============================
// Tipos
// ===============================
interface Cliente {
  nombre: string;
}

interface Pago {
  metodo?: string;
}

interface EnvioCompleto {
  id: number;
  guia?: string;
  peso: number;
  largo: number;
  ancho: number;
  alto: number;

  costoTotal?: number;

  cliente?: Cliente;
  destinatarioNombre: string;

  pago?: Pago;
}

export default function ConfirmarEnvio() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [envio, setEnvio] = useState<EnvioCompleto | null>(null);

  // ===============================
  // CARGAR ENVÍO DESDE BACKEND
  // ===============================
  useEffect(() => {
    async function fetchEnvio() {
      try {
        const res = await api.get(`/envios/${id}/completo`);
        setEnvio(res.data);
      } catch (err) {
        Swal.fire("Error", "No se pudo cargar el envío.", "error");
        navigate("/envios");
      }
    }

    fetchEnvio();
  }, [id, navigate]);

  if (!envio) return <div>Cargando...</div>;

  // ===============================
  // FINALIZAR ENVÍO
  // ===============================
  async function finalizarEnvio() {
    try {
      // 1. GENERAR GUÍA
      const resGuia = await api.post(`/envios/${id}/generar-guia`, {
        usuarioId: 1
      });

      if (!resGuia.data || !resGuia.data.guia) {
        Swal.fire("Error", "No se pudo generar la guía.", "error");
        return;
      }

      // 2. DOCUMENTAR ENVÍO
      await api.post(`/envios/${id}/documentar`, {
        usuarioId: 1
      });

      Swal.fire({
        icon: "success",
        title: "Guía generada",
        text: `Guía: ${resGuia.data.guia}`,
        timer: 1800,
        showConfirmButton: false
      });

      // 3. REDIRIGIR A LA PÁGINA DE GUÍA
      navigate(`/envios/${id}/generar-guia`);
    } catch (err) {
      Swal.fire("Error", "No se pudo completar el envío.", "error");
    }
  }

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="confirmar-container">
      <h2>Confirmar Envío</h2>

      <div className="card">
        <p><strong>Remitente:</strong> {envio.cliente?.nombre}</p>
        <p><strong>Destinatario:</strong> {envio.destinatarioNombre}</p>
        <p><strong>Peso:</strong> {envio.peso} kg</p>
        <p>
          <strong>Dimensiones:</strong> {envio.largo} × {envio.ancho} × {envio.alto} cm
        </p>
        <p>
          <strong>Total:</strong> ${envio.costoTotal?.toFixed(2) ?? "0.00"}
        </p>
        <p>
          <strong>Método de pago:</strong> {envio.pago?.metodo ?? "No registrado"}
        </p>
      </div>

      <button className="btn-primary" onClick={finalizarEnvio}>
        Generar Guía y Finalizar Envío
      </button>

      <button
        className="btn-secondary mt-20"
        onClick={() => navigate("/envios/nuevo/cobro")}
      >
        ← Regresar
      </button>
    </div>
  );
}
