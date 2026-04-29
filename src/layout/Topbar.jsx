import { FiBell } from "react-icons/fi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import "./Topbar.css";

export default function Topbar({ user, onToggleNotifications }) {
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
          <span className="user-name">{user?.name || "Usuario"}</span>
        </div>
      </div>
    </header>
  );
}