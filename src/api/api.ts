// ===============================
//  API CLIENT – Teletransporter (TypeScript + Vite 8)
// ===============================

const MODE = import.meta.env.MODE;

const BASE_URL =
  MODE === "production"
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_DEV;

// ===============================
// Tipos
// ===============================

export interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

// ===============================
// Token
// ===============================
function getToken(): string | null {
  return (
    localStorage.getItem("accessToken") ||
    import.meta.env.VITE_API_TOKEN ||
    null
  );
}

// ===============================
// Lectura segura
// ===============================
async function safeRead(response: Response): Promise<any> {
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
// Query params
// ===============================
function buildQuery(url: string, params: QueryParams): string {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null)
  );

  const qs = new URLSearchParams(clean as Record<string, string>).toString();
  return qs ? `${url}?${qs}` : url;
}

// ===============================
// Cliente principal
// ===============================
async function apiFetch<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const config: ApiOptions = {
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

    return await safeRead(response) as T;

  } catch (error) {
    console.error("❌ Error en apiFetch:", error);
    throw error;
  }
}

// ===============================
// Métodos HTTP tipados
// ===============================
const api = {
  get: <T>(url: string, params: QueryParams = {}): Promise<T> =>
    apiFetch<T>(buildQuery(url, params), { method: "GET" }),

  post: <T>(url: string, body: unknown): Promise<T> =>
    apiFetch<T>(url, {
      method: "POST",
      body: JSON.stringify(body)
    }),

  put: <T>(url: string, body: unknown): Promise<T> =>
    apiFetch<T>(url, {
      method: "PUT",
      body: JSON.stringify(body)
    }),

  patch: <T>(url: string, body: unknown): Promise<T> =>
    apiFetch<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body)
    }),

  delete: <T>(url: string): Promise<T> =>
    apiFetch<T>(url, { method: "DELETE" })
};

// ===============================
// Export
// ===============================
export default api;
