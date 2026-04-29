import { useEffect, useState } from "react";
import api from "../../api/api.js";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarIncidencia() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState(null);

  useEffect(() => {
    api.get(`/incidencias/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = async () => {
    try {
      await api.put(`/incidencias/${id}`, form);
      alert("Incidencia actualizada");
      nav("/incidencias");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
  };

  if (!form) return <div>Cargando...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar incidencia #{id}</h1>

      <div className="bg-white shadow p-4 rounded flex flex-col gap-4">

        <input className="input" name="tipo" value={form.tipo} onChange={cambiar} />
        <textarea className="input" name="descripcion" value={form.descripcion} onChange={cambiar} />

        <select className="input" name="estado" value={form.estado} onChange={cambiar}>
          <option value="ABIERTA">Abierta</option>
          <option value="EN_PROCESO">En proceso</option>
          <option value="CERRADA">Cerrada</option>
        </select>

        <button className="btn-primary" onClick={guardar}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
