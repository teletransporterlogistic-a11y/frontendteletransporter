import { useEffect, useState } from "react";
import api from "../../api/api.js";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Ajusta esta ruta según tu backend
        const data = await api.get("/auth/me");

        setUser({
          id: data.id,
          nombre: data.nombre,
          rol: data.rol?.nombre || "usuario",
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            data.nombre
          )}&background=0b3d91&color=fff`,
          online: true
        });
      } catch (err) {
        console.error("Error cargando usuario:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return { user, loading };
}
