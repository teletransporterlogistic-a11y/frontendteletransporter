import React, { useState } from "react";

export default function General() {
  const [form, setForm] = useState({
    empresa: "",
    rfc: "",
    telefono: "",
    email: "",
    zonaHoraria: "America/Mexico_City",
    prefijoGuia: "TT",
    longitudGuia: 10,
    notificacionesEmail: true,
    notificacionesWhatsapp: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">General del Sistema</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Empresa */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Datos de la Empresa</h2>

          <label className="block mb-2">Nombre</label>
          <input name="empresa" value={form.empresa} onChange={handleChange}
            className="input" />

          <label className="block mt-4 mb-2">RFC</label>
          <input name="rfc" value={form.rfc} onChange={handleChange}
            className="input" />

          <label className="block mt-4 mb-2">Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange}
            className="input" />

          <label className="block mt-4 mb-2">Correo</label>
          <input name="email" value={form.email} onChange={handleChange}
            className="input" />
        </div>

        {/* Preferencias */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Preferencias de Envíos</h2>

          <label className="block mb-2">Prefijo de Guía</label>
          <input name="prefijoGuia" value={form.prefijoGuia} onChange={handleChange}
            className="input" />

          <label className="block mt-4 mb-2">Longitud del consecutivo</label>
          <input type="number" name="longitudGuia" value={form.longitudGuia}
            onChange={handleChange} className="input" />

          <label className="block mt-4 mb-2">Zona Horaria</label>
          <select name="zonaHoraria" value={form.zonaHoraria} onChange={handleChange}
            className="input">
            <option value="America/Mexico_City">México (CDMX)</option>
            <option value="America/Monterrey">Monterrey</option>
            <option value="America/Tijuana">Tijuana</option>
          </select>

          <div className="mt-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="notificacionesEmail"
                checked={form.notificacionesEmail} onChange={handleChange} />
              Notificaciones por correo
            </label>

            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="notificacionesWhatsapp"
                checked={form.notificacionesWhatsapp} onChange={handleChange} />
              Notificaciones por WhatsApp
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}