import { useNavigate } from "react-router-dom";
import "./BotonRegresar.css";

export default function BotonRegresar() {
  const navigate = useNavigate();

  return (
    <button className="btn-regresar" onClick={() => navigate(-1)}>
      ← Regresar
    </button>
  );
}
