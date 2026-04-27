import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../api/api.js";

import { MetodoPagoSelector } from "./MetodoPagoSelector";
import { PagoEfectivo } from "./PagoEfectivo";
import { PagoTarjeta } from "./PagoTarjeta";

import "./CobroEnvioPage.css";

export default function CobroPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const envio = location.state?.envio;

  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState(null);

  const [costos, setCostos] = useState({
    subtotal: 0,
    seguro: 0,
    recoleccion: 0,
    otros: 0,
    total: 0,
  });

  const [pagoData, setPagoData] = useState({});

  // -----------------------------------------------------
  // CARGAR COSTOS AUTOMÁTICOS DESDE EL ENVÍO (BACKEND)
  // -----------------------------------------------------
  useEffect(() => {
    if (!envio) {
      setError("No se recibió información del envío.");
      return;
    }

    const subtotal = envio.costoBase || envio.costo || 0;
    const seguro = envio.costoSeguro || envio.seguro || 0;
    const recoleccion = envio.costoRecoleccion || (envio.recoleccion ? 35 : 0);
    const otros = envio.costoServicios || 0;

    setCostos({
      subtotal,
      seguro,
      recoleccion,
      otros,
      total: subtotal + seguro + recoleccion + otros,
    });
  }, [envio]);

  // -----------------------------------------------------
  // REGISTRAR PAGO
  // -----------------------------------------------------
  async function confirmarPago() {
    if (!envio) return;

    setProcesando(true);
    setError(null);

    try {
      await api.post(`/envios/${envio.id}/pago`, {
        metodo: pagoData.metodo || metodoPago,
        monto: costos.total,
        detalle: pagoData,
        referencia: pagoData.referencia || "",
        notas: pagoData.notas || "",
      });

      navigate(`/envios/${envio.id}/generar-guia`, {
        state: { envio },
      });
    } catch (err) {
      console.error(err);
      setError("No se pudo procesar el pago.");
    }

    setProcesando(false);
  }

  if (!envio) {
    return <div className="error-msg">No hay datos del envío.</div>;
  }

  return (
    <div className="cobro-wrapper">

      <h2 className="cobro-title">Cobro del Envío</h2>
      <p className="cobro-subtitle">Selecciona el método de pago y confirma</p>

      {/* RESUMEN DE COSTOS */}
      <div className="card cobro-card">
        <h3 className="section-title">Resumen de costos</h3>

        <div className="costo-row">
          <span>Subtotal</span>
          <strong>${costos.subtotal}</strong>
        </div>

        <div className="costo-row">
          <span>Seguro</span>
          <strong>${costos.seguro}</strong>
        </div>

        <div className="costo-row">
          <span>Recolección</span>
          <strong>${costos.recoleccion}</strong>
        </div>

        <div className="costo-row">
          <span>Otros cargos</span>
          <strong>${costos.otros}</strong>
        </div>

        <hr />

        <div className="costo-total">
          <span>Total a pagar</span>
          <strong>${costos.total}</strong>
        </div>
      </div>

      {/* SELECTOR DE MÉTODO DE PAGO */}
      <MetodoPagoSelector metodo={metodoPago} onSelect={setMetodoPago} />

      {/* FORMULARIO SEGÚN MÉTODO */}
      {metodoPago === "efectivo" && (
        <PagoEfectivo
          total={costos.total}
          data={pagoData}
          onChange={setPagoData}
        />
      )}

      {(metodoPago === "debito" || metodoPago === "credito") && (
        <PagoTarjeta
          data={pagoData}
          onChange={setPagoData}
        />
      )}

      {error && <div className="error-msg">{error}</div>}

      <button
        className="btn-primary btn-confirmar"
        onClick={confirmarPago}
        disabled={procesando}
      >
        {procesando ? "Procesando..." : "Confirmar pago"}
      </button>
    </div>
  );
}
