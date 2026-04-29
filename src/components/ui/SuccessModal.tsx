export function SuccessModal({ open, onClose, message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[380px] animate-fadeIn">
        <div className="text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-xl font-semibold mb-2">¡Éxito!</h2>
          <p className="text-gray-700 mb-6">{message}</p>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
