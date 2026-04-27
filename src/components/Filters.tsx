import { FilterState, OperatorStatus } from "../types";

type Props = {
  filters: FilterState;
  onChange: (f: FilterState) => void;
};

const ALL: OperatorStatus[] = [
  "LIBRE",
  "OCUPADO",
  "EN_RUTA",
  "RECOLECTANDO",
  "ENTREGANDO",
];

const Filters: React.FC<Props> = ({ filters, onChange }) => {
  const toggleEstado = (estado: OperatorStatus) => {
    const estados = filters.estados.includes(estado)
      ? filters.estados.filter((e) => e !== estado)
      : [...filters.estados, estado];

    onChange({ ...filters, estados });
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
        Filtros
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {ALL.map((estado) => {
          const active = filters.estados.includes(estado);

          return (
            <button
              key={estado}
              onClick={() => toggleEstado(estado)}
              style={{
                padding: "4px 10px",
                borderRadius: 999,
                border: "1px solid #1e293b",
                cursor: "pointer",
                fontSize: 11,
                background: active ? "#1d4ed8" : "#020617",
                color: active ? "#e5e7eb" : "#9ca3af",
                transition: "0.15s",
              }}
            >
              {estado}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
