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

  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [costos, setCostos] = useState({
    subtotal: 0,
    seguro: 0,
    recoleccion: 0,
    otros: 0,
    total: 0,
  });

  const [pagoData, setPagoData] = useState<any>({});

  // -----------------------------------------------------
  // CARGAR COSTOS AUTOMÁTICOS DESDE EL ENVÍO (BACKEND)
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
        state: { envio },
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

      <h2 className="pago-title">Registrar Pago</h2>
      <p className="pago-subtitle">Selecciona el método de pago y confirma</p>

      {/* RESUMEN DE COSTOS */}
      <div className="card pago-card">
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

      {/* FORMULARIOS SEGÚN MÉTODO */}
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

      {metodoPago === "transferencia" && (
        <div className="card">
          <h3>Pago por Transferencia</h3>

          <div className="input-group">
            <label>Banco</label>
            <input
              placeholder="BBVA, Santander, Banorte..."
              onChange={(e) =>
                setPagoData({ ...pagoData, banco: e.target.value, metodo: "transferencia" })
              }
            />
          </div>

          <div className="input-group">
            <label>Referencia</label>
            <input
              placeholder="Número de referencia"
              onChange={(e) =>
                setPagoData({ ...pagoData, referencia: e.target.value, metodo: "transferencia" })
              }
            />
          </div>
        </div>
      )}

      {metodoPago === "cheque-bancario" && (
        <div className="card">
          <h3>Pago con Cheque</h3>

          <div className="input-group">
            <label>Banco</label>
            <input
              placeholder="Banco emisor"
              onChange={(e) =>
                setPagoData({ ...pagoData, banco: e.target.value, metodo: "cheque" })
              }
            />
          </div>

          <div className="input-group">
            <label>Número de cheque</label>
            <input
              placeholder="000000"
              onChange={(e) =>
                setPagoData({ ...pagoData, numeroCheque: e.target.value, metodo: "cheque" })
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
          <h3>Crédito Teletransporter</h3>
          <p>Este cliente tiene crédito autorizado.</p>

          <div className="line">
            <span>Monto a cargar:</span>
            <strong>${costos.total}</strong>
          </div>

          <p className="info">El cargo se aplicará automáticamente a su línea de crédito.</p>

          {setPagoData({ metodo: "credito-tele", monto: costos.total })}
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
