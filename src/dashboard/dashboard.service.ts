import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  // MÉTRICAS PRINCIPALES
  async getMetrics() {
    const clientes = await this.prisma.cliente.count();
    const guias = await this.prisma.guia.count();
    const rutas = await this.prisma.ruta.count();

    // Ejemplo: suma de ingresos de guías entregadas
    const ingresosData = await this.prisma.guia.aggregate({
      _sum: { total: true },
    });

    return {
      clientes,
      guias,
      rutas,
      ingresos: ingresosData._sum.total ?? 0,
    };
  }

  // GUÍAS POR MES (últimos 6 meses)
  async getGuiasPorMes() {
    const result = await this.prisma.$queryRaw<
      { mes: string; guias: number }[]
    >`
      SELECT 
        DATE_FORMAT(fechaRegistro, '%b') AS mes,
        COUNT(*) AS guias
      FROM guia
      WHERE fechaRegistro >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY MONTH(fechaRegistro)
      ORDER BY fechaRegistro ASC;
    `;

    return result;
  }

  // ENTREGAS POR ZONA (ejemplo usando municipio)
  async getEntregasPorZona() {
    const result = await this.prisma.$queryRaw<
      { nombre: string; entregas: number }[]
    >`
      SELECT 
        m.nombre AS nombre,
        COUNT(g.id) AS entregas
      FROM guia g
      JOIN municipio m ON g.municipioId = m.id
      GROUP BY m.id
      ORDER BY entregas DESC;
    `;

    return result;
  }

  // GUÍAS POR MUNICIPIO (para gráfica de pastel)
  async getGuiasPorMunicipio() {
    const result = await this.prisma.$queryRaw<
      { name: string; value: number }[]
    >`
      SELECT 
        m.nombre AS name,
        COUNT(g.id) AS value
      FROM guia g
      JOIN municipio m ON g.municipioId = m.id
      GROUP BY m.id
      ORDER BY value DESC
      LIMIT 10;
    `;

    return result;
  }
}
