import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/api.js";

import { MetodoPagoSelector } from "./MetodoPagoSelector";
import { PagoEfectivo } from "./PagoEfectivo";
import { PagoTarjeta } from "./PagoTarjeta";

import "./CobroEnvioPage.css";

export default function CobroPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const envio = location.state?.envio;

  // 🔥 Detectar si es pago en destino
  const esPagoDestino = envio?.pago_destino === true;

  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState(null);

  const [costos, setCostos] = useState({
    base: 0,
    seguro: 0,
    servicios: 0,
    descuento: 0,
    total: 0,
  });

  const [pagoData, setPagoData] = useState({});

  // -----------------------------------------------------
  // CARGAR COSTOS DESDE EL ENVÍO
  // -----------------------------------------------------
  useEffect(() => {
    if (!envio) {
      setError("No se recibió información del envío.");
      return;
    }

    const base = envio.costoBase ?? 0;
    const seguro = envio.costoSeguro ?? 0;
    const servicios = envio.costoServicios ?? 0;
    const descuento = envio.descuento ?? 0;

    const total = envio.costoTotal ?? base + seguro + servicios - descuento;

    setCostos({
      base,
      seguro,
      servicios,
      descuento,
      total,
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
        detalle: JSON.stringify(pagoData), // 🔥 FIX universal
        referencia: pagoData.referencia || "",
        notas: pagoData.notas || "",
        pagoDestino: esPagoDestino, // 🔥 Para que backend sepa si es destino
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

      <h2 className="cobro-title">
        {esPagoDestino ? "Cobro al Destinatario" : "Cobro del Envío"}
      </h2>

      <p className="cobro-subtitle">
        {esPagoDestino
          ? "Este envío es por cobrar en destino"
          : "El cliente paga en origen"}
      </p>

      {/* RESUMEN DE COSTOS */}
      <div className="card cobro-card">
        <h3 className="section-title">Resumen de costos</h3>

        <div className="costo-row">
          <span>Costo base</span>
          <strong>${costos.base}</strong>
        </div>

        <div className="costo-row">
          <span>Seguro</span>
          <strong>${costos.seguro}</strong>
        </div>

        <div className="costo-row">
          <span>Servicios</span>
          <strong>${costos.servicios}</strong>
        </div>

        <div className="costo-row">
          <span>Descuento</span>
          <strong>-${costos.descuento}</strong>
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
