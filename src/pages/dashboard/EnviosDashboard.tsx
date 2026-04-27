export default function EnviosDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Envíos</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">En tránsito</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">89</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">Entregados hoy</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">54</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">Incidencias</h2>
          <p className="text-4xl font-bold text-red-600 mt-2">6</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">Pendientes por asignar</h2>
          <p className="text-4xl font-bold text-yellow-600 mt-2">12</p>
        </div>

      </div>
    </div>
  );
}
