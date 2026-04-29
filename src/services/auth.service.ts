export interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    nombre: string;
    email: string;
    rolId: number;
    rol: string;
    permisos: string[];
  };
}

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");

  return res.json();
}
