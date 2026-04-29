import api from "../api/api";

const flotaService = {
  obtenerVehiculos: async () => {
    const res = await api.get("/vehiculos");

    // Normalizamos la respuesta para que SIEMPRE sea un array
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.data)) return res.data.data;
    if (Array.isArray(res.data.items)) return res.data.items;
    if (Array.isArray(res.data.vehiculos)) return res.data.vehiculos;

    console.warn("⚠ Backend devolvió un formato inesperado:", res.data);
    return [];
  },

  obtenerMantenimientos: async (id) => {
    const res = await api.get(`/vehiculos/${id}/mantenimientos`);

    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.data)) return res.data.data;
    if (Array.isArray(res.data.items)) return res.data.items;

    console.warn("⚠ Backend devolvió un formato inesperado:", res.data);
    return [];
  },

  crearVehiculo: async (data) => {
    const res = await api.post("/vehiculos", data);
    return res.data;
  },

  crearMantenimiento: async (id, data) => {
    const res = await api.post(`/vehiculos/${id}/mantenimientos`, data);
    return res.data;
  },
};

export default flotaService;
