import { OperatorPosition } from "../types";

type Props = {
  history: Record<number, OperatorPosition[]>;
  replay: { enabled: boolean; operadorId?: number };
  setReplay: (r: { enabled: boolean; operadorId?: number }) => void;
};

const ReplayControls: React.FC<Props> = ({ history, replay, setReplay }) => {
  const operadoresConHist = Object.keys(history)
    .map(Number)
    .sort((a, b) => a - b); // orden ascendente

  const handleSelect = (value: string) => {
    const operadorId = value ? Number(value) : undefined;

    setReplay({
      enabled: operadorId ? replay.enabled : false, // si quita operador, detener replay
      operadorId,
    });
  };

  const toggleReplay = () => {
    if (!replay.operadorId) return; // no permitir si no hay operador seleccionado

    setReplay((r) => ({
      ...r,
      enabled: !r.enabled,
    }));
  };

  return (
    <div
      style={{
        padding: 10,
        borderBottom: "1px solid #1f2937",
        fontSize: 12,
        background: "#0f172a",
      }}
    >
      <div style={{ marginBottom: 6, color: "#9ca3af", fontWeight: 500 }}>
        Replay histórico
      </div>

      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <select
          value={replay.operadorId ?? ""}
          onChange={(e) => handleSelect(e.target.value)}
          style={{
            fontSize: 12,
            padding: "4px 6px",
            background: "#020617",
            color: "#e5e7eb",
            border: "1px solid #1e293b",
            borderRadius: 6,
          }}
        >
          <option value="">Selecciona operador</option>
          {operadoresConHist.map((id) => (
            <option key={id} value={id}>
              Operador {id}
            </option>
          ))}
        </select>

        <button
          onClick={toggleReplay}
          disabled={!replay.operadorId}
          style={{
            padding: "4px 10px",
            fontSize: 12,
            borderRadius: 6,
            border: "none",
            cursor: replay.operadorId ? "pointer" : "not-allowed",
            background: replay.enabled ? "#b91c1c" : "#16a34a",
            color: "#e5e7eb",
            opacity: replay.operadorId ? 1 : 0.5,
            transition: "0.15s",
          }}
        >
          {replay.enabled ? "Detener" : "Reproducir"}
        </button>
      </div>
    </div>
  );
};

export default ReplayControls;
