import "./MetodoPagoSelector.css";

export function MetodoPagoSelector({ metodo, onSelect }) {
  return (
    <div className="card metodo-selector">
      <h3>Método de Pago</h3>

      <div className="metodos-grid">
        <button
          className={metodo === "efectivo" ? "active" : ""}
          onClick={() => onSelect("efectivo")}
        >
          Efectivo
        </button>

        <button
          className={metodo === "cheque" ? "active" : ""}
          onClick={() => onSelect("cheque")}
        >
          Cheque
        </button>

        <button
          className={metodo === "debito" ? "active" : ""}
          onClick={() => onSelect("debito")}
        >
          Tarjeta Débito
        </button>

        <button
          className={metodo === "credito" ? "active" : ""}
          onClick={() => onSelect("credito")}
        >
          Tarjeta Crédito
        </button>

        <button
          className={metodo === "transferencia" ? "active" : ""}
          onClick={() => onSelect("transferencia")}
        >
          Transferencia
        </button>

        <button
          className={metodo === "mixto" ? "active" : ""}
          onClick={() => onSelect("mixto")}
        >
          Mixto
        </button>

        <button
          className={metodo === "credito-tele" ? "active" : ""}
          onClick={() => onSelect("credito-tele")}
        >
          Crédito TLPM
        </button>
      </div>
    </div>
  );
}

export default MetodoPagoSelector;
