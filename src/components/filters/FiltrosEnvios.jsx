import { useState } from "react";
import "./FiltrosEnvios.css";

export default function FiltrosEnvios({
  destinos,
  clientes,
  operadores,
  estados,
  filtros,
  setFiltros,
}) {
  const [guia, setGuia] = useState("");

  function update(field, value) {
    setFiltros((prev) => ({ ...prev, [field]: value }));
  }

  function resetFiltros() {
    setFiltros({
      destino: "",
      cliente: "",
      operador: "",
      estado: "",
      guia: "",
    });
    setGuia("");
  }

  function buscarPorGuia(e) {
    const value = e.target.value;
    setGuia(value);
    update("guia", value);
  }

  return (
    <div className="filtros-wrapper">
      <h3 className="filtros-title">Filtros</h3>

      <div className="filtros-grid">

        {/* Buscar por guía */}
        <input
          type="text"
          className="filtro-input"
          placeholder="Buscar por guía…"
          value={guia}
          onChange={buscarPorGuia}
        />

        {/* Destino */}
        <select
          className="filtro-select"
          value={filtros.destino}
          onChange={(e) => update("destino", e.target.value)}
        >
          <option value="">Destino</option>
          {destinos
            .filter(Boolean)
            .sort()
            .map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
        </select>

        {/* Cliente */}
        <select
          className="filtro-select"
          value={filtros.cliente}
          onChange={(e) => update("cliente", e.target.value)}
        >
          <option value="">Cliente</option>
          {clientes
            .filter((c) => c?.id)
            .sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
        </select>

        {/* Operador */}
        <select
          className="filtro-select"
          value={filtros.operador}
          onChange={(e) => update("operador", e.target.value)}
        >
          <option value="">Operador</option>
          {operadores
            .filter((o) => o?.id)
            .sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map((o) => (
              <option key={o.id} value={o.id}>
                {o.nombre}
              </option>
            ))}
        </select>

        {/* Estado */}
        <select
          className="filtro-select"
          value={filtros.estado}
          onChange={(e) => update("estado", e.target.value)}
        >
          <option value="">Estado</option>
          {estados.map((e) => (
            <option key={e.id} value={e.id}>
              {e.label}
            </option>
          ))}
        </select>

        {/* Botón reset */}
        <button className="btn-reset" onClick={resetFiltros}>
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}