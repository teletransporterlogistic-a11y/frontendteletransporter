export default function OperadoresDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Operadores</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">Activos</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">42</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">En ruta</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">31</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">Inactivos</h2>
          <p className="text-4xl font-bold text-gray-600 mt-2">11</p>
        </div>

      </div>
    </div>
  );
}
