import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import "./ClientesCards.css";

export default function ClientesCards() {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    api.get("/clientes").then((res) => setClientes(res.data));
  }, []);

  const filtrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  function exportarExcel() {
    const hoja = XLSX.utils.json_to_sheet(clientes);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Clientes");
    XLSX.writeFile(libro, "clientes.xlsx");
  }

  return (
    <div>
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar cliente"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <button className="btn-excel" onClick={exportarExcel}>
          Exportar Excel
        </button>
      </div>

      <div className="cards-container">
        {filtrados.map((c) => (
          <div key={c.id} className="cliente-card">
            <h3>{c.nombre}</h3>
            <p><strong>Tipo:</strong> {c.tipo}</p>
            <p><strong>RFC:</strong> {c.rfc}</p>

            <h4>Dirección</h4>
            <p>{c.calle} #{c.numero}</p>
            <p>{c.colonias}, CP {c.codigoPostal}</p>
            <p>{c.ciudad}, {c.municipio}, {c.estado}</p>

            <h4>Contacto</h4>
            <p><strong>Celular:</strong> {c.celular}</p>
            <p><strong>Teléfono 2:</strong> {c.telefono2 || "—"}</p>
            <p><strong>Correo:</strong> {c.correo || "—"}</p>
            <p><strong>Email:</strong> {c.email || "—"}</p>

            <h4>Fiscales</h4>
            <p><strong>Factura:</strong> {c.requiereFactura ? "Sí" : "No"}</p>
            <p><strong>IVA:</strong> {c.retencionIVA ? "Sí" : "No"}</p>
            <p><strong>Descuento:</strong> {c.descuento}%</p>

            <h4>Otros</h4>
            <p><strong>Datos adicionales:</strong> {c.datosAdicionales || "—"}</p>

            <h4>Domicilios adicionales</h4>
            {c.domicilios?.length > 0 ? (
              <ul>
                {c.domicilios.map((d, i) => (
                  <li key={i}>
                    {d.calle} #{d.numero}, {d.colonia}, CP {d.codigoPostal}, {d.ciudad}, {d.municipio}, {d.estado}
                  </li>
                ))}
              </ul>
            ) : (
              <p>—</p>
            )}

            <div className="card-actions">
              <Link to={`/clientes/editar/${c.id}`}>Editar</Link>
              <Link to={`/clientes/eliminar/${c.id}`} className="danger">
                Eliminar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
