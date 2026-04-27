// src/api/apiFetch.ts
export interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function apiFetch<T = any>(url: string, options: ApiOptions = {}): Promise<T> {
  const token =
    localStorage.getItem("accessToken") ||
    import.meta.env.VITE_API_TOKEN ||
    null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    console.error("❌ Error en API:", response.status, response.statusText);
    throw new Error(`API error: ${response.status}`);
  }

  // Intentar leer JSON, si falla, leer texto
  try {
    return await response.json();
  } catch {
    return (await response.text()) as unknown as T;
  }
}
