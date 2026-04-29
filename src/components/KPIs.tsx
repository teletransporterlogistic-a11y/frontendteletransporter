type Props = {
  kpis: {
    totalActivos: number
    porEstado: Record<string, number>
  }
}

const KPIs: React.FC<Props> = ({ kpis }) => {
  return (
    <div style={{ padding: 10, borderBottom: '1px solid #1f2937', fontSize: 12 }}>
      <div style={{ marginBottom: 6, color: '#9ca3af' }}>KPIs</div>
      <div style={{ display: 'flex', gap: 10 }}>
        <div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>Operadores activos</div>
          <div style={{ fontSize: 18 }}>{kpis.totalActivos}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>Por estado</div>
          <div style={{ fontSize: 11 }}>
            {Object.entries(kpis.porEstado).map(([estado, count]) => (
              <div key={estado}>
                {estado}: {count}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KPIs
