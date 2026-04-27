export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de control</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">Envíos del día</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">128</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">Operadores activos</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">42</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">Notificaciones pendientes</h2>
          <p className="text-4xl font-bold text-red-600 mt-2">17</p>
        </div>

      </div>
    </div>
  );
}
