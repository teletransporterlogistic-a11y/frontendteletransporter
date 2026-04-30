import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FiHome,
  FiPackage,
  FiUsers,
  FiChevronDown,
  FiChevronRight,
  FiSearch,
  FiSettings,
  FiBell,
  FiGrid,
  FiUserCheck,
  FiPlus,
  FiTruck,
  FiFileText,
  FiAlertTriangle
} from "react-icons/fi";
import "./Sidebar.css";

// ===============================
// Tipos
// ===============================
interface User {
  id: number;
  name: string;
  role: string;
  avatar: string | null;
}

interface MenuChild {
  label: string;
  path: string;
  icon?: JSX.Element;
}

interface MenuItem {
  label: string;
  path?: string;
  icon: JSX.Element;
  roles: string[];
  badge?: number;
  children?: MenuChild[];
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  user: User;
}

// ===============================
// Componente
// ===============================
export default function Sidebar({ collapsed, setCollapsed, user }: SidebarProps) {
  const [open, setOpen] = useState<number | null>(null);
  const location = useLocation();

  const avatarUrl =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User"
    )}&background=0D8ABC&color=fff`;

  // ===============================
  // Menú tipado
  // ===============================
  const menu: MenuItem[] = [
    {
      label: "Inicio",
      path: "/",
      icon: <FiHome />,
      roles: ["admin", "operador", "cliente"]
    },

    {
      label: "Dashboards",
      icon: <FiGrid />,
      roles: ["admin", "operador"],
      children: [
        { label: "Dashboard Envíos", path: "/dashboard/envios" },
        { label: "Dashboard Notificaciones", path: "/dashboard/notificaciones" },
        { label: "Dashboard Operadores", path: "/dashboard/operadores" }
      ]
    },

    {
      label: "Clientes",
      icon: <FiUsers />,
      roles: ["admin"],
      children: [
        { label: "Lista", path: "/clientes" },
        { label: "Nuevo Cliente", path: "/clientes/nuevo" }
      ]
    },

    {
      label: "Envíos",
      icon: <FiPackage />,
      roles: ["admin", "operador"],
      children: [
        { label: "Lista", path: "/envios" },
        { label: "Nuevo Envío", path: "/envios/nuevo", icon: <FiPlus /> }
      ]
    },

    {
      label: "Entregas",
      icon: <FiPackage />,
      roles: ["admin", "operador"],
      children: [
        { label: "Ocurre", path: "/entregas/ocurre" },
        { label: "Entrega a domicilio", path: "/entregas/domicilio" }
      ]
    },

    {
      label: "Almacén",
      icon: <FiPackage />,
      roles: ["admin", "operador"],
      children: [
        { label: "Inventario", path: "/almacen/inventario" },
        { label: "Descarga", path: "/almacen/descarga" },
        { label: "Modificación de estado", path: "/almacen/modificacion-estado" }
      ]
    },

    {
      label: "Flota",
      icon: <FiTruck />,
      roles: ["admin"],
      children: [
        { label: "Unidades", path: "/flota/unidades" },
        { label: "Nueva Unidad", path: "/flota/unidades/nueva" },
        { label: "Dashboard Mantenimiento", path: "/mantenimiento/dashboard", icon: <FiGrid /> },
        { label: "Cargas de combustible", path: "/mantenimiento/combustible", icon: <FiAlertTriangle /> },
        { label: "Servicios de unidades", path: "/mantenimiento/servicios", icon: <FiSettings /> },
        { label: "Alertas de servicio", path: "/mantenimiento/alertas", icon: <FiBell /> }
      ]
    },

    {
      label: "Facturación",
      icon: <FiFileText />,
      roles: ["admin"],
      children: [
        { label: "Centro operativo", path: "/facturacion/centro-operativo" },
        { label: "Informes", path: "/facturacion/informes" },
        { label: "Facturación electrónica", path: "/facturacion/electronica" },
        { label: "Complemento carta porte", path: "/facturacion/complemento-carta-porte" }
      ]
    },

    {
      label: "Administración",
      icon: <FiSettings />,
      roles: ["admin"],
      children: [
        { label: "Cobranza de créditos", path: "/admin/cobranza-creditos" },
        { label: "Corte de caja EAD", path: "/admin/corte-caja-ead" },
        { label: "Corte de caja ocurre", path: "/admin/corte-caja-ocurre" }
      ]
    },

    {
      label: "Operaciones",
      icon: <FiUserCheck />,
      roles: ["admin", "operador"],
      children: [
        { label: "Asignar guías", path: "/operaciones/asignar-guias" },
        { label: "Carga a rutas", path: "/operaciones/carga-rutas" },
        { label: "Descarga", path: "/operaciones/descarga-rutas" },
        { label: "Llegada a almacén", path: "/operaciones/llegada-almacen" }
      ]
    },

    {
      label: "Incidencias",
      icon: <FiAlertTriangle />,
      roles: ["admin", "operador"],
      children: [
        { label: "Daños", path: "/incidencias/danos" },
        { label: "Reexpediciones", path: "/incidencias/reexpediciones" },
        { label: "Segundas/Terceras salidas", path: "/incidencias/salidas" }
      ]
    },

    {
      label: "Operadores",
      icon: <FiUsers />,
      roles: ["admin"],
      children: [
        { label: "Lista", path: "/operadores" },
        { label: "Registrar operador", path: "/operadores/nuevo" },
        { label: "Asignación de rutas", path: "/operadores/asignacion" }
      ]
    },

    {
      label: "Rastreo",
      icon: <FiSearch />,
      roles: ["admin", "operador", "cliente"],
      children: [
        { label: "Rastreo de paquetes", path: "/rastreo/paquetes" },
        { label: "Rastreo de unidades", path: "/rastreo/unidades" },
        { label: "Historial de guía", path: "/rastreo/historial-guia" }
      ]
    },

    {
      label: "Notificaciones",
      path: "/dashboard/notificaciones",
      icon: <FiBell />,
      badge: 3,
      roles: ["admin"]
    },

    {
      label: "Configuración",
      icon: <FiSettings />,
      roles: ["admin"],
      children: [
        { label: "General", path: "/configuracion/general" },
        { label: "Integraciones", path: "/configuracion/integraciones" },
        { label: "Tarifas", path: "/configuracion/tarifas" },
        { label: "Usuarios", path: "/configuracion/usuarios" },
        { label: "Roles", path: "/configuracion/roles" }
      ]
    }
  ];

  // ===============================
  // Render
  // ===============================
  return (
    <aside
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      style={{ overflowY: "auto", maxHeight: "100vh" }}
    >
      {/* Usuario */}
      <div className="sidebar-user">
        <img src={avatarUrl} className="avatar" />
        {!collapsed && (
          <div className="user-info">
            <strong>{user?.name || "Usuario"}</strong>
            <span className="status online">Online</span>
          </div>
        )}
      </div>

      {/* Botón colapsar */}
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "→" : "←"}
      </button>

      {/* Menú */}
      <nav className="sidebar-menu">
        {menu
          .filter(item => item.roles.includes(user.role))
          .map((item, index) => {
            const isActive = item.path && location.pathname.startsWith(item.path);

            return (
              <div key={index}>
                {/* ITEM SIN SUBMENÚ */}
                {!item.children && item.path && (
                  <Link
                    className={`sidebar-item ${isActive ? "active" : ""}`}
                    to={item.path}
                    data-tooltip={collapsed ? item.label : ""}
                  >
                    <span className="icon">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="badge">{item.badge}</span>
                    )}
                  </Link>
                )}

                {/* ITEM CON SUBMENÚ */}
                {item.children && (
                  <div className="accordion">
                    <div
                      className={`sidebar-item ${open === index ? "open" : ""}`}
                      onClick={() => setOpen(open === index ? null : index)}
                      data-tooltip={collapsed ? item.label : ""}
                    >
                      <span className="icon">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                      {!collapsed && (
                        <span className="chevron">
                          {open === index ? <FiChevronDown /> : <FiChevronRight />}
                        </span>
                      )}
                    </div>

                    {!collapsed && open === index && (
                      <div className="submenu">
                        {item.children.map((sub, i) => {
                          const subActive = location.pathname === sub.path;
                          return (
                            <Link
                              key={i}
                              className={`submenu-item ${subActive ? "active" : ""}`}
                              to={sub.path}
                            >
                              {sub.icon && <span className="icon">{sub.icon}</span>}
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </nav>
    </aside>
  );
}
