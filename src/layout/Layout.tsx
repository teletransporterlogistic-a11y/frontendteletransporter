import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import NotificationsPanel from "./NotificationsPanel";

import { useTheme } from "@/context/ThemeContext";
import "./Layout.css";

// ===============================
// Tipos
// ===============================
interface User {
  id: number;
  name: string;
  role: string;
  avatar: string | null;
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  const { theme } = useTheme();
  const location = useLocation();

  // ===============================
  // Cargar usuario (mock)
  // ===============================
  useEffect(() => {
    async function loadUser() {
      const mockUser: User = {
        id: 1,
        name: "Teletransporter",
        role: "admin",
        avatar: null
      };
      setUser(mockUser);
    }
    loadUser();
  }, []);

  if (!user) return null;

  const logoSrc = theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg";
  const isHome = location.pathname === "/";

  return (
    <div className={`app-container app-shell ${collapsed ? "collapsed" : ""}`}>
      
      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
      />

      {/* CONTENIDO PRINCIPAL */}
      <div className="main-area">
        <Topbar
          user={user}
          onToggleNotifications={() => setNotificationsOpen(o => !o)}
        />

        <main className="content">

          {/* Logo solo en el home */}
          {isHome && (
            <div className="layout-logo-container">
              <img
                src={logoSrc}
                alt="Teletransporter"
                className="layout-logo"
              />
            </div>
          )}

          {/* Módulos */}
          <div className="module-container">
            <Outlet />
          </div>

        </main>
      </div>

      {/* PANEL DE NOTIFICACIONES */}
      <NotificationsPanel
        user={user}
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}
