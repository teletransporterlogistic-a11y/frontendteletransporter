// src/components/layout/Sidebar.tsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Teletransporter</h2>

      <nav className="sidebar-nav">
        <Link to="/clientes">Clientes</Link>
        <Link to="/guias">Guías</Link>
        <Link to="/rutas">Rutas</Link>
        <Link to="/config">Configuración</Link>
      </nav>
    </aside>
  );
}
