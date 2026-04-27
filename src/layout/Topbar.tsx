import { FiBell, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";
import "./Topbar.css";

// ===============================
// Tipos
// ===============================
interface User {
  id: number;
  name: string;
  role: string;
  avatar: string | null;
}

interface TopbarProps {
  user: User;
  onToggleNotifications: () => void;
}

// ===============================
// Componente
// ===============================
export default function Topbar({ user, onToggleNotifications }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      {/* IZQUIERDA */}
      <div className="topbar-left">
        <h2>Panel de Control</h2>
      </div>

      {/* DERECHA */}
      <div className="topbar-right">

        {/* CAMBIO DE TEMA */}
        <button className="topbar-icon theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>

        {/* NOTIFICACIONES */}
        <button
          className="topbar-icon notifications-btn"
          onClick={onToggleNotifications}
        >
          <FiBell />
          <span className="notification-dot"></span>
        </button>

        {/* USUARIO */}
        <div className="topbar-user">
          <span className="user-name">{user?.name ?? "Usuario"}</span>
        </div>
      </div>
    </header>
  );
}
