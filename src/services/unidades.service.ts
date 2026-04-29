import api from "../api/api";

export interface UnidadesResponse {
  data: any[];
  total: number;
}

const unidadesService = {
  getUnidades: async (params: any): Promise<UnidadesResponse> => {
    const res = await api.get("/unidades", { params });
    return res.data;
  },

  getUnidad: async (id: number) => {
    const res = await api.get(`/unidades/${id}`);
    return res.data;
  },

  createUnidad: async (data: any) => {
    const res = await api.post("/unidades", data);
    return res.data;
  },

  updateUnidad: async (id: number, data: any) => {
    const res = await api.put(`/unidades/${id}`, data);
    return res.data;
  },

  deleteUnidad: async (id: number) => {
    const res = await api.delete(`/unidades/${id}`);
    return res.data;
  },

  getMantenimientos: async (id: number) => {
    const res = await api.get(`/unidades/${id}/mantenimientos`);
    return res.data;
  },

  createMantenimiento: async (id: number, data: any) => {
    const res = await api.post(`/unidades/${id}/mantenimientos`, data);
    return res.data;
  },
};

export default unidadesService;
