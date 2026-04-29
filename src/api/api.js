// ===============================
//  API CLIENT – Teletransporter
// ===============================

// Detectar entorno automáticamente
const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_API_URL_DEV;

// Token desde localStorage o desde .env
function getToken() {
  return (
    localStorage.getItem("accessToken") ||
    import.meta.env.VITE_API_TOKEN ||
    null
  );
}

// Cliente principal
async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const config = {
    ...options,
    headers
  };

  if (import.meta.env.VITE_DEBUG === "true") {
    console.log("📤 API Request:", url, config);
  }

  try {
    const response = await fetch(url, config);

    if (import.meta.env.VITE_DEBUG === "true") {
      console.log("📥 API Response:", response.status, response);
    }

    if (!response.ok) {
      const errorText = await safeRead(response);
      throw new Error(
        `API Error ${response.status}: ${errorText || response.statusText}`
      );
    }

    return await safeRead(response);

  } catch (error) {
    console.error("❌ Error en apiFetch:", error);
    throw error;
  }
}

// Función segura para leer JSON o texto
async function safeRead(response) {
  try {
    return await response.json();
  } catch {
    try {
      return await response.text();
    } catch {
      return null;
    }
  }
}

// ===============================
//  Helper para query params
// ===============================

function buildQuery(url, params) {
  // Eliminar undefined y null
  const clean = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null)
  );

  const qs = new URLSearchParams(clean).toString();
  return qs ? `${url}?${qs}` : url;
}

// ===============================
//  Métodos HTTP de conveniencia
// ===============================

const api = {
  get: (url, params = {}) =>
    apiFetch(buildQuery(url, params), { method: "GET" }),

  post: (url, body = {}) =>
    apiFetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    }),

  put: (url, body = {}) =>
    apiFetch(url, {
      method: "PUT",
      body: JSON.stringify(body)
    }),

  patch: (url, body = {}) =>
    apiFetch(url, {
      method: "PATCH",
      body: JSON.stringify(body)
    }),

  delete: (url) =>
    apiFetch(url, { method: "DELETE" })
};

// ===============================
//  EXPORT DEFAULT
// ===============================

export default api;
