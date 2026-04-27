import { AlmacenMovimiento } from "../../types/almacen";

export default function MovimientosTimeline({ movimientos }: { movimientos: AlmacenMovimiento[] }) {
  return (
    <div className="timeline">
      {movimientos.map((m) => (
        <div key={m.id} className="timeline-item">
          <div className={`timeline-dot ${m.tipo.toLowerCase()}`} />

          <div className="timeline-content">
            <h4>{m.tipo}</h4>

            {m.detalle && <p>{m.detalle}</p>}

            <small>{new Date(m.creadoEn).toLocaleString()}</small>

            {m.operador && (
              <small>Operador: {m.operador.nombre}</small>
            )}

            {(m.lat && m.lng) && (
              <small>GPS: {m.lat}, {m.lng}</small>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
