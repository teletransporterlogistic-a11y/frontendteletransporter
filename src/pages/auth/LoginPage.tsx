import { useState } from "react";
import { useLogin } from "../../hooks/auth/useLogin";

export default function LoginPage() {
  const login = useLogin();
  const [email, setEmail] = useState("admin@teletransporter.com");
  const [password, setPassword] = useState("admin123");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={login.isPending}>
        {login.isPending ? "Ingresando..." : "Ingresar"}
      </button>

      {login.isError && <div className="error">Credenciales inválidas</div>}
    </form>
  );
}
