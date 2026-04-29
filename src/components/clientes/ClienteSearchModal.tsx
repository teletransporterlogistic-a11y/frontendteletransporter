import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../api/api";
import "./ClienteSearchModal.css"; // ✔ CSS correcto

export default function ClienteSearchModal({ open, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    async function fetchClientes() {
      try {
        setLoading(true);

        const res = await api.get(`/clientes/buscar?query=${query}`);
        setClientes(res.data || []);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error al buscar clientes",
          text: "No se pudo conectar con el servidor",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchClientes();
  }, [query, open]);

  if (!open) return null;

  async function seleccionarCliente(id) {
    try {
      const res = await api.get(`/clientes/${id}`);
      const clienteCompleto = res.data;

      Swal.fire({
        icon: "success",
        title: "Cliente seleccionado",
        text: `${clienteCompleto.nombre} ha sido cargado en el formulario`,
        timer: 1500,
        showConfirmButton: false,
      });

      onSelect(clienteCompleto);
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo cargar el cliente completo", "error");
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Buscar cliente</h2>

        <input
          className="input"
          placeholder="Nombre, teléfono, correo o ciudad"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading && <p className="loading-text">Buscando...</p>}

        <div className="modal-list">
          {clientes.length === 0 && !loading && (
            <p className="no-results">No se encontraron clientes</p>
          )}

          {clientes.map((c) => (
            <div key={c.id} className="modal-item">
              <div>
                <strong>{c.nombre}</strong>
                <p>{c.celular}</p>
                <p>
                  {c.ciudad}, {c.estado}
                </p>
              </div>

              <button
                className="btn-primary"
                onClick={() => seleccionarCliente(c.id)}
              >
                Seleccionar
              </button>
            </div>
          ))}
        </div>

        <button className="btn-secondary mt-10" onClick={onClose}>
          Cerrar
        </button>

        <button
          className="btn-link mt-10"
          onClick={() => {
            onClose();
            window.location.href = "/clientes/nuevo";
          }}
        >
          Registrar nuevo cliente
        </button>
      </div>
    </div>
  );
}
