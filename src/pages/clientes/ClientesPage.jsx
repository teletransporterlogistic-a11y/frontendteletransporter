import { useState } from "react";
import ClientesList from "./ClientesList";
import ClientesCards from "./ClientesCards";
import "./ClientesPage.css";

export default function ClientesPage() {
  const [vista, setVista] = useState("lista");

  return (
    <div className="clientes-page">
      <div className="vista-switch">
        <button
          className={vista === "lista" ? "active" : ""}
          onClick={() => setVista("lista")}
        >
          Lista
        </button>

        <button
          className={vista === "tarjetas" ? "active" : ""}
          onClick={() => setVista("tarjetas")}
        >
          Tarjetas
        </button>
      </div>

      {vista === "lista" ? <ClientesList /> : <ClientesCards />}
    </div>
  );
}
