import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/api.js";

import { MetodoPagoSelector } from "./MetodoPagoSelector";
import { PagoEfectivo } from "./PagoEfectivo";
import { PagoTarjeta } from "./PagoTarjeta";

import "./PagoForm.css";

export default function PagoForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const envio = location.state?.envio;
  const esEntrega = location.state?.esEntrega || false;

  // 🔥 Si viene de PagoSelectorPage, trae método
  const metodoInicial = location.state?.metodoPago || "efectivo";

  const [metodoPago, setMetodoPago] = useState(metodoInicial);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState(null);

  const [costos, setCostos] = useState({
    subtotal: 0,
    seguro: 0,
    recoleccion: 0,
    otros: 0,
    descuento: 0,
    total: 0,
  });

  const [pagoData, setPagoData] = useState({});

  // -----------------------------------------------------
  // 🔥 VALIDACIÓN SOLO PARA ENTREGAS
  // -----------------------------------------------------
  useEffect(() => {
    if (!envio) return;

    if (esEntrega && !envio.pago_destino) {
      setError("Este envío no requiere pago porque no es pago en destino.");
      setTimeout(() => navigate(-1), 1500);
    }
  }, [envio, esEntrega]);

  // -----------------------------------------------------
  // CARGAR COSTOS + APLICAR DESCUENTO DEL CLIENTE
  // -----------------------------------------------------
  useEffect(() => {
    if (!envio) {
      setError("No se recibió información del envío.");
      return;
    }

    const subtotal = envio.costoBase || envio.costo || 0;
    const seguro = envio.seguro || envio.costoSeguro || 0;
    const recoleccion = envio.recoleccion ? 35 : 0;
    const otros = envio.otros || envio.costoServicios || 0;

    const descuentoCliente = envio.cliente?.descuento ?? 0;
    const descuentoEnvio = envio.descuento ?? 0;

    const descuento = descuentoCliente + descuentoEnvio;

    const total = subtotal + seguro + recoleccion + otros - descuento;

    setCostos({
      subtotal,
      seguro,
      recoleccion,
      otros,
      descuento,
      total,
    });
  }, [envio]);

  // -----------------------------------------------------
  // REGISTRAR PAGO
  // -----------------------------------------------------
  async function registrarPago() {
    if (!envio) return;

    setProcesando(true);
    setError(null);

    try {
      await api.post(`/envios/${envio.id}/pago`, {
        metodo: pagoData.metodo || metodoPago,
        monto: costos.total,
        detalle: pagoData,
      });

      navigate(`/envios/${envio.id}/generar-guia`, {
        state: { envio: { ...envio, costos } },
      });
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar el pago.");
    }

    setProcesando(false);
  }

  if (!envio) {
    return <div className="error-msg">No hay datos del envío.</div>;
  }

  return (
    <div className="pago-wrapper">

      {/* 🔥 BOTÓN REGRESAR */}
      <button className="btn-regresar" onClick={() => navigate(-1)}>
        ← Regresar
      </button>

      <h2 className="pago-title">Registrar Pago</h2>
      <p className="pago-subtitle">Selecciona el método de pago y confirma</p>

      {/* RESUMEN DE COSTOS */}
      <div className="card pago-card">
        <h3 className="section-title">Resumen de costos</h3>

        <div className="costo-row">
          <span>Subtotal</span>
          <strong>${costos.subtotal.toFixed(2)}</strong>
        </div>

        <div className="costo-row">
          <span>Seguro</span>
          <strong>${costos.seguro.toFixed(2)}</strong>
        </div>

        <div className="costo-row">
          <span>Recolección</span>
          <strong>${costos.recoleccion.toFixed(2)}</strong>
        </div>

        <div className="costo-row">
          <span>Otros cargos</span>
          <strong>${costos.otros.toFixed(2)}</strong>
        </div>

        <div className="costo-row">
          <span>Descuento aplicado</span>
          <strong>-${costos.descuento.toFixed(2)}</strong>
        </div>

        <hr />

        <div className="costo-total">
          <span>Total a pagar</span>
          <strong>${costos.total.toFixed(2)}</strong>
        </div>
      </div>

      {/* SELECTOR DE MÉTODO DE PAGO */}
      <MetodoPagoSelector metodo={metodoPago} onSelect={setMetodoPago} />

      {/* FORMULARIOS SEGÚN MÉTODO */}
      {metodoPago === "efectivo" && (
        <PagoEfectivo
          total={costos.total}
          data={pagoData}
          onChange={setPagoData}
        />
      )}

      {(metodoPago === "debito" || metodoPago === "credito") && (
        <PagoTarjeta data={pagoData} onChange={setPagoData} />
      )}

      {metodoPago === "transferencia" && (
        <div className="card">
          <h3>Pago por Transferencia</h3>

          <div className="input-group">
            <label>Banco</label>
            <input
              placeholder="BBVA, Santander, Banorte..."
              onChange={(e) =>
                setPagoData({
                  ...pagoData,
                  banco: e.target.value,
                  metodo: "transferencia",
                })
              }
            />
          </div>

          <div className="input-group">
            <label>Referencia</label>
            <input
              placeholder="Número de referencia"
              onChange={(e) =>
                setPagoData({
                  ...pagoData,
                  referencia: e.target.value,
                  metodo: "transferencia",
                })
              }
            />
          </div>
        </div>
      )}

      {metodoPago === "cheque" && (
        <div className="card">
          <h3>Pago con Cheque</h3>

          <div className="input-group">
            <label>Banco</label>
            <input
              placeholder="Banco emisor"
              onChange={(e) =>
                setPagoData({
                  ...pagoData,
                  banco: e.target.value,
                  metodo: "cheque",
                })
              }
            />
          </div>

          <div className="input-group">
            <label>Número de cheque</label>
            <input
              placeholder="000000"
              onChange={(e) =>
                setPagoData({
                  ...pagoData,
                  numeroCheque: e.target.value,
                  metodo: "cheque",
                })
              }
            />
          </div>
        </div>
      )}

      {metodoPago === "mixto" && (
        <div className="card">
          <h3>Pago Mixto</h3>

          <div className="input-group">
            <label>Efectivo</label>
            <input
              type="number"
              placeholder="Monto en efectivo"
              onChange={(e) =>
                setPagoData({
                  ...pagoData,
                  efectivo: Number(e.target.value),
                  metodo: "mixto",
                })
              }
            />
          </div>

          <div className="input-group">
            <label>Tarjeta</label>
            <input
              type="number"
              placeholder="Monto con tarjeta"
              onChange={(e) =>
                setPagoData({
                  ...pagoData,
                  tarjeta: Number(e.target.value),
                  metodo: "mixto",
                })
              }
            />
          </div>
        </div>
      )}

      {metodoPago === "credito-tele" && (
        <div className="card">
          <h3>Crédito TLPM</h3>
          <p>Este cliente tiene crédito autorizado.</p>

          <div className="line">
            <span>Monto a cargar:</span>
            <strong>${costos.total.toFixed(2)}</strong>
          </div>

          <p className="info">
            El cargo se aplicará automáticamente a su línea de crédito.
          </p>
        </div>
      )}

      {error && <div className="error-msg">{error}</div>}

      <button
        className="btn-primary btn-confirmar"
        onClick={registrarPago}
        disabled={procesando}
      >
        {procesando ? "Procesando..." : "Confirmar pago"}
      </button>
    </div>
  );
}
