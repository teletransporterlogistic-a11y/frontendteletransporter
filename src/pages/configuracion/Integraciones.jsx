import React, { useState } from "react";

export default function Integraciones() {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Integraciones</h1>

      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">API</h2>

        <label className="block mb-2">API Key</label>
        <input value={apiKey} onChange={(e) => setApiKey(e.target.value)}
          className="input" />

        <button className="btn-primary mt-4">Guardar</button>
      </div>
    </div>
  );
}