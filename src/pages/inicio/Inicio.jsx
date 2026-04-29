import "./Inicio.css";
import logo from "../../assets/logo.png";

export default function Inicio() {
  return (
    <div className="inicio-container">
      <div className="inicio-card">

        <img src={logo} alt="Teletransporter Logo" className="inicio-logo" />

        <h1 className="inicio-title">TELETRANSPORTER</h1>
        <h2 className="inicio-subtitle-strong">PAQUETERÍA Y MENSAJERÍA</h2>

        <div className="inicio-divider"></div>

        <p className="inicio-welcome">Bienvenido a Teletransporter</p>
        <p className="inicio-description">
          Plataforma de gestión logística y operación de envíos
        </p>
      </div>
    </div>
  );
}