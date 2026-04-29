import api from "../api/api";

const unidadesService = {
  obtenerUnidades: async () => {
    const res = await api.get("/unidades");
    return res.data;
  },

  crearUnidad: async (data) => {
    const res = await api.post("/unidades", data);
    return res.data;
  },

  actualizarUnidad: async (id, data) => {
    const res = await api.put(`/unidades/${id}`, data);
    return res.data;
  },
};

export default unidadesService;
