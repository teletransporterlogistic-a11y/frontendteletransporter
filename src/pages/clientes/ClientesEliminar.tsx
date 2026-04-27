// src/pages/clientes/ClientesEliminar.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/api";

// ===============================
// Tipos
// ===============================
interface Cliente {
  id: number;
  nombre: string;
  correo?: string;
  telefono?: string;
  rfc?: string;
  razonSocial?: string;
  domicilioFiscal?: string;
}

interface RouteParams {
  id?: string;
}

// ===============================
// Componente
// ===============================
export default function ClientesEliminar() {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ===============================
  // Cargar cliente
  // ===============================
  useEffect(() => {
    if (!id) return;

    api
      .get(`/clientes/${id}`)
      .then((res) => setCliente(res))
      .finally(() => setLoading(false));
  }, [id]);

  // ===============================
  // Eliminar cliente
  // ===============================
  async function eliminar() {
    if (!id) return;

    try {
      await api.delete(`/clientes/${id}`);
      alert("Cliente eliminado con éxito");
      navigate("/clientes");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al eliminar el cliente");
    }
  }

  // ===============================
  // Render
  // ===============================
  if (loading) {
    return <div className="card">Cargando...</div>;
  }

  if (!cliente) {
    return <div className="card">Cliente no encontrado</div>;
  }

  return (
    <div className="card">
      <h2>Eliminar cliente</h2>

      <p>
        ¿Seguro que deseas eliminar al cliente{" "}
        <strong>{cliente.nombre}</strong>?
      </p>

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button className="btn-danger" onClick={eliminar}>
          Eliminar
        </button>

        <button
          className="btn-secondary"
          onClick={() => navigate("/clientes")}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
