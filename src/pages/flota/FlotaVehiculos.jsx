import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import flotaService from "../../services/flotaService";

export default function FlotaVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarVehiculos();
  }, []);

  async function cargarVehiculos() {
    try {
      const data = await flotaService.obtenerVehiculos();
      setVehiculos(data);
    } catch (error) {
      console.error("Error cargando vehículos:", error);
    }
  }

  return (
    <div>
      <h2>Vehículos</h2>

      <button onClick={() => navigate("/flota/vehiculos/nuevo")}>
        Nuevo vehículo
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px", marginTop: "20px" }}>
        {vehiculos.map((v) => (
          <div
            key={v.id}
            style={{
              background: "#0d1b2a",
              padding: "16px",
              borderRadius: "8px",
              color: "white",
              border: "1px solid #1b263b",
            }}
          >
            <h3 style={{ margin: 0 }}>{v.placas}</h3>
            <p style={{ margin: "4px 0", opacity: 0.8 }}>{v.tipo}</p>

            <div style={{ marginTop: "10px", fontSize: "14px" }}>
              <p><strong>Marca:</strong> {v.marca || "-"}</p>
              <p><strong>Modelo:</strong> {v.modelo || "-"}</p>
              <p><strong>Año:</strong> {v.anio || "-"}</p>
              <p><strong>Capacidad:</strong> {v.capacidadKg} kg</p>
              <p><strong>Volumen:</strong> {v.volumenM3} m³</p>
              <p><strong>Estado:</strong> {v.estado}</p>
              <p><strong>Número de serie:</strong> {v.numeroSerie || "-"}</p>
              <p><strong>Color:</strong> {v.color || "-"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
