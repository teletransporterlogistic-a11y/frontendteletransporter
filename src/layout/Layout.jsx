import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import NotificationsPanel from "./NotificationsPanel";

import { useTheme } from "../context/ThemeContext";
import "./Layout.css";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    async function loadUser() {
      const mockUser = {
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
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} user={user} />

      <div className="main-area">
        <Topbar
          user={user}
          onToggleNotifications={() => setNotificationsOpen(o => !o)}
        />

        <main className="content">

          {/* Mostrar logo solo en el home */}
          {isHome && (
            <div className="layout-logo-container">
              <img src={logoSrc} alt="Teletransporter" className="layout-logo" />
            </div>
          )}

          {/* Aquí aparecen TODOS los módulos */}
          <div className="module-container">
            <Outlet />
          </div>

        </main>
      </div>

      {user && (
        <NotificationsPanel
          user={user}
          open={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
        />
      )}
    </div>
  );
}
