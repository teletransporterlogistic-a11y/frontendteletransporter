// src/pages/clientes/ClientesCards.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import api from "@/api/api";
import "./ClientesCards.css";

// ===============================
// Tipos
// ===============================
export interface Cliente {
  id: string;
  codigo: string;
  tipo: string;
  nombre: string;
  rfc?: string;

  calle?: string;
  numero?: string;
  colonias?: string;
  codigoPostal?: string;
  ciudad?: string;
  municipio?: string;
  estado?: string;

  celular?: string;
  telefono2?: string;
  correo?: string;
  email?: string;

  requiereFactura?: boolean;
  retencionIVA?: boolean;
  descuento?: number;

  datosAdicionales?: string;

  domicilios?: {
    calle?: string;
    numero?: string;
    colonia?: string;
    codigoPostal?: string;
    ciudad?: string;
    municipio?: string;
    estado?: string;
  }[];
}

// ===============================
// Componente
// ===============================
export default function ClientesCards() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState<string>("");

  // ===============================
  // Cargar clientes
  // ===============================
  useEffect(() => {
    api.get("/clientes").then((res) => setClientes(res));
  }, []);

  // ===============================
  // Filtro por nombre
  // ===============================
  const filtrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  // ===============================
  // Exportar Excel
  // ===============================
  function exportarExcel() {
    const hoja = XLSX.utils.json_to_sheet(clientes);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Clientes");
    XLSX.writeFile(libro, "clientes.xlsx");
  }

  // ===============================
  // Render
  // ===============================
  return (
    <div>
      {/* Filtros */}
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

      {/* Cards */}
      <div className="cards-container">
        {filtrados.map((c) => (
          <div key={c.id} className="cliente-card">
            <h3>{c.nombre}</h3>
            <p><strong>Tipo:</strong> {c.tipo}</p>
            <p><strong>RFC:</strong> {c.rfc || "—"}</p>

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
            {c.domicilios?.length ? (
              <ul>
                {c.domicilios.map((d, i) => (
                  <li key={i}>
                    {d.calle} #{d.numero}, {d.colonia}, CP {d.codigoPostal},{" "}
                    {d.ciudad}, {d.municipio}, {d.estado}
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
