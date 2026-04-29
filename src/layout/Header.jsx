import "./Layout.css";

export default function Header() {
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
          />
          <span>Admin</span>
        </div>

      </div>
    </header>
  );
}