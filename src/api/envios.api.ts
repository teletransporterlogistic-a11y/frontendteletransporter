import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/envios",
});

/* ================================
    1. CREAR ENVÍO
================================ */
export function crearEnvio(data) {
  return API.post("/", data);
}

/* ================================
    2. ACTUALIZAR ENVÍO
================================ */
export function actualizarEnvio(envioId: number | string, data) {
  return API.put(`/${envioId}`, data);
}

/* ================================
    3. OBTENER ENVÍO POR ID
================================ */
export function obtenerEnvio(envioId: number | string) {
  return API.get(`/${envioId}`);
}

/* ================================
    4. BUSCAR POR GUÍA
================================ */
export function buscarPorGuia(guia: string) {
  return API.get(`/guia/${guia}`);
}

/* ================================
    5. REGISTRAR PAGO (ORIGEN/DESTINO)
================================ */
export function registrarPago(envioId: number | string, data) {
  return API.post(`/${envioId}/pago`, data);
}

/* ================================
    6. GENERAR GUÍA
================================ */
export function generarGuia(envioId: number | string, usuarioId: string) {
  return API.post(`/${envioId}/generar-guia`, { usuarioId });
}

/* ================================
    7. OBTENER ETIQUETAS (PDF/ZPL)
================================ */
export function obtenerEtiquetas(envioId: number | string) {
  return API.get(`/${envioId}/etiquetas`);
}

export function descargarEtiquetaPDF(envioId: number | string) {
  return API.get(`/${envioId}/etiquetas/pdf`, { responseType: "blob" });
}

export function descargarEtiquetaZPL(envioId: number | string) {
  return API.get(`/${envioId}/etiquetas/zpl`, { responseType: "blob" });
}

/* ================================
    8. DOCUMENTAR ENVÍO
================================ */
export function documentarEnvio(envioId: number | string, data) {
  return API.post(`/${envioId}/documentar`, data);
}

/* ================================
    9. REGISTRAR EVENTO
================================ */
export function registrarEvento(envioId: number | string, data) {
  return API.post(`/${envioId}/eventos`, data);
}

/* ================================
    10. CAMBIAR ESTADO
================================ */
export function cambiarEstado(envioId: number | string, data) {
  return API.post(`/${envioId}/estado`, data);
}

/* ================================
    11. LISTAR ENVÍOS (FILTROS)
================================ */
export function listarEnvios(params?: any) {
  return API.get("/", { params });
}

/* ================================
    12. MÉTRICAS
================================ */
export function obtenerMetricas() {
  return API.get("/metricas");
}

/* ================================
    13. RUTAS PARA APP MÓVIL
================================ */
export function registrarEntrega(envioId: number | string, data) {
  return API.post(`/${envioId}/entrega`, data);
}

export function registrarIntento(envioId: number | string, data) {
  return API.post(`/${envioId}/intento`, data);
}

export function registrarRecepcion(envioId: number | string, data) {
  return API.post(`/${envioId}/recepcion`, data);
}

/* ================================
    14. IMPRESIÓN (DATOS COMPLETOS)
================================ */
export function obtenerDatosImpresion(envioId: number | string) {
  return API.get(`/${envioId}/impresion-datos`);
}
