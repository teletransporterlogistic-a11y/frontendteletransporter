import { useState } from "react";

export default function EntregaOcurreForm({ envio, onSubmit }) {
  const [nombreRecibe, setNombreRecibe] = useState("");
  const [documentoId, setDocumentoId] = useState("");
  const [firmaUrl, setFirmaUrl] = useState("");

  return (
    <div className="entrega-form">
      <h2>Entrega Ocurre</h2>

      <div className="form-group">
        <label>Envío</label>
        <input value={`#${envio.id}`} disabled />
      </div>

      <div className="form-group">
        <label>Cliente</label>
        <input value={envio.cliente?.nombre ?? "—"} disabled />
      </div>

      <div className="form-group">
        <label>Nombre de quien recibe</label>
        <input
          value={nombreRecibe}
          onChange={(e) => setNombreRecibe(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Documento presentado</label>
        <input
          value={documentoId}
          onChange={(e) => setDocumentoId(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Firma digital</label>
        <input
          placeholder="URL de firma o base64"
          value={firmaUrl}
          onChange={(e) => setFirmaUrl(e.target.value)}
        />
      </div>

      <button
        className="btn-primary"
        onClick={() =>
          onSubmit({
            envioId: envio.id,
            clienteId: envio.clienteId,
            nombreRecibe,
            documentoId,
            firmaUrl,
          })
        }
      >
        Confirmar entrega
      </button>
    </div>
  );
}
