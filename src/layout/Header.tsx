import "./Layout.css";

// ===============================
// Tipos
// ===============================
interface HeaderProps {}

// ===============================
// Componente
// ===============================
export default function Header({}: HeaderProps) {
  return (
    <header className="header">

      <div className="header-left">
        <h1 className="header-title">Teletransporter</h1>
      </div>

      <div className="header-right">

        <button className="header-btn">🔔</button>

        <button className="header-btn">🌙</button>

        <div className="header-user">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=333&color=fff"
            className="header-avatar"
            alt="Usuario"
          />
          <span>Admin</span>
        </div>

      </div>
    </header>
  );
}
