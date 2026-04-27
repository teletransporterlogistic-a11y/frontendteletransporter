// src/components/layout/Navbar.tsx
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Panel de Control</h1>
      </div>

      <div className="navbar-right">
        <ThemeToggle />
      </div>
    </header>
  );
}
