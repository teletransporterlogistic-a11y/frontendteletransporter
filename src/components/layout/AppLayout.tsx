// src/components/layout/AppLayout.tsx
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./layout.css";

export default function AppLayout({ children }) {
  return (
    <div className="layout-container">
      <Sidebar />

      <div className="layout-main">
        <Navbar />
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
}
