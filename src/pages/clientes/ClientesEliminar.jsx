import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function ClientesEliminar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/clientes/${id}`)
      .then((res) => setCliente(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  async function eliminar() {
    try {
      await api.delete(`/clientes/${id}`);
      alert("Cliente eliminado con éxito");
      navigate("/clientes");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al eliminar el cliente");
    }
  }

  if (loading) return <div className="card">Cargando...</div>;
  if (!cliente) return <div className="card">Cliente no encontrado</div>;

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

        <button className="btn-secondary" onClick={() => navigate("/clientes")}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
