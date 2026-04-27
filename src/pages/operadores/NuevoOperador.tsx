import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function NuevoOperador() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    password: "",
    activo: true,
    rolId: "" as number | string | "",
    telefonoWhatsApp: "",
    telefonoSMS: "",
    notiWhatsApp: false,
    notiSMS: false,
    notiPush: false,
  });

  const cambiar = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const guardar = async () => {
    try {
      const payload = {
        ...form,
        rolId: form.rolId ? Number(form.rolId) : null,
      };
      await api.post("/operadores", payload);
      alert("Operador creado");
      nav("/dashboard/operadores");
    } catch (err) {
      console.error(err);
      alert("Error al crear operador");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nuevo Operador</h1>

      <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-4 max-w-xl">
        <div>
          <label>Nombre</label>
          <input
            className="input"
            name="nombre"
            value={form.nombre}
            onChange={cambiar}
          />
        </div>

        <div>
          <label>Usuario</label>
          <input
            className="input"
            name="usuario"
            value={form.usuario}
            onChange={cambiar}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={form.password}
            onChange={cambiar}
          />
        </div>

        <div>
          <label>Rol ID</label>
          <input
            className="input"
            name="rolId"
            value={form.rolId}
            onChange={cambiar}
            placeholder="ID del rol (opcional)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Teléfono WhatsApp</label>
            <input
              className="input"
              name="telefonoWhatsApp"
              value={form.telefonoWhatsApp}
              onChange={cambiar}
            />
          </div>
          <div>
            <label>Teléfono SMS</label>
            <input
              className="input"
              name="telefonoSMS"
              value={form.telefonoSMS}
              onChange={cambiar}
            />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={cambiar}
            />
            Activo
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="notiWhatsApp"
              checked={form.notiWhatsApp}
              onChange={cambiar}
            />
            Noti WhatsApp
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="notiSMS"
              checked={form.notiSMS}
              onChange={cambiar}
            />
            Noti SMS
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="notiPush"
              checked={form.notiPush}
              onChange={cambiar}
            />
            Noti Push
          </label>
        </div>

        <div className="flex gap-2">
          <button className="btn-primary" onClick={guardar}>
            Guardar
          </button>
          <button
            className="btn-secondary"
            onClick={() => nav("/dashboard/operadores")}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
