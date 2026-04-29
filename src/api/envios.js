export async function crearEnvioAPI(data) {
  const API_URL = import.meta.env.VITE_API_URL;

  const res = await fetch(`${API_URL}/envios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  return json;
}