export default function RastreoTimeline({ eventos }) {
  if (!eventos || eventos.length === 0) {
    return (
      <div className="timeline-empty">
        No hay eventos registrados.
      </div>
    );
  }

  return (
    <div className="timeline">
      {eventos.map((e) => (
        <div key={e.id} className="timeline-item">
          <div className="timeline-dot" />

          <div className="timeline-content">
            <h4 className="timeline-title">{e.estado}</h4>

            {e.detalle && (
              <p className="timeline-detail">{e.detalle}</p>
            )}

            <small className="timeline-date">
              {new Date(e.creadoEn).toLocaleString()}
            </small>

            {e.lat && e.lng && (
              <small className="timeline-location">
                Ubicación: {e.lat}, {e.lng}
              </small>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
