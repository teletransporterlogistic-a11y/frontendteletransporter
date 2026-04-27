import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("metrics")
  getMetrics() {
    return this.dashboardService.getMetrics();
  }

  @Get("guias-por-mes")
  getGuiasPorMes() {
    return this.dashboardService.getGuiasPorMes();
  }

  @Get("entregas-por-zona")
  getEntregasPorZona() {
    return this.dashboardService.getEntregasPorZona();
  }

  @Get("guias-por-municipio")
  getGuiasPorMunicipio() {
    return this.dashboardService.getGuiasPorMunicipio();
  }
}
