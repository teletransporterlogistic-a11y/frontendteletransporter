// src/pages/configuracion/Configuracion.tsx
import { Link } from "react-router-dom";

export default function Configuracion() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Configuración</h1>
      <p className="text-gray-600 mb-6">
        Ajustes del sistema y preferencias operativas
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link to="/configuracion/general">
          <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">⚙️ General del Sistema</h2>
            <p className="text-gray-600">
              Ajustes básicos, empresa, notificaciones y preferencias globales.
            </p>
          </div>
        </Link>

        <Link to="/configuracion/tarifas">
          <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">💰 Tarifas y Precios</h2>
            <p className="text-gray-600">
              Tarifas base, volumétricas, descuentos y servicios adicionales.
            </p>
          </div>
        </Link>

        <Link to="/configuracion/usuarios">
          <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">👥 Usuarios y Roles</h2>
            <p className="text-gray-600">
              Administración de usuarios, permisos y roles personalizados.
            </p>
          </div>
        </Link>

        <Link to="/configuracion/integraciones">
          <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">🔗 Integraciones</h2>
            <p className="text-gray-600">
              API, facturación, mapas y servicios externos.
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}
