export async function apiFetch(url, options = {}) {
  const token =
    localStorage.getItem("accessToken") ||
    import.meta.env.VITE_API_TOKEN || 
    null;

  const headers = {
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

  return response.json();
}
