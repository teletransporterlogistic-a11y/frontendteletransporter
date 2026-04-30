// src/pages/auth/ResetPassword.tsx
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  async function enviar() {
    if (!email.trim()) {
      alert("Ingresa un correo");
      return;
    }

    try {
      await api.post("/auth/reset-password", { email });
      alert("Se envió un enlace para restablecer tu contraseña");
      navigate("/login");
    } catch (err) {
      console.error("Error enviando solicitud:", err);
      alert("Error al enviar solicitud");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Restablecer contraseña</h1>

      <label className="block mb-2">Correo electrónico</label>

      <input
        type="email"
        className="input mb-4"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />

      <button className="btn-primary w-full" onClick={enviar}>
        Enviar enlace
      </button>
    </div>
  );
}
