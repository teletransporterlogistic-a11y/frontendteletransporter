import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Layout
import Layout from "@/layout/Layout";

// ===============================
// Lazy imports (optimización total)
// ===============================
const Inicio = lazy(() => import("@/pages/inicio/Inicio"));

// Dashboard
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const EnviosDashboard = lazy(() => import("@/pages/envios/EnviosDashboard"));
const OperadoresDashboard = lazy(() => import("@/pages/operadores/OperadoresDashboard"));
const NotificacionesDashboard = lazy(() => import("@/pages/notificaciones/NotificacionesDashboard"));

// Clientes
const ClientesList = lazy(() => import("@/pages/clientes/ClientesList"));
const NuevoCliente = lazy(() => import("@/pages/clientes/NuevoCliente"));
const ClientesEditar = lazy(() => import("@/pages/clientes/ClientesEditar"));
const ClientesEliminar = lazy(() => import("@/pages/clientes/ClientesEliminar"));

// Envíos
const EnviosList = lazy(() => import("@/pages/envios/EnviosList"));
const NuevoEnvio = lazy(() => import("@/pages/envios/NuevoEnvio"));
const EditarEnvio = lazy(() => import("@/pages/envios/EditarEnvio"));
const RastreoEnvio = lazy(() => import("@/pages/envios/RastreoEnvio"));
const ReciboEntrega = lazy(() => import("@/pages/envios/ReciboEntrega"));

// Cobro / Guía / Impresión
const CobroEnvioPage = lazy(() => import("@/pages/envios/CobroEnvioPage"));
const GenerarGuiaPage = lazy(() => import("@/pages/envios/GenerarGuiaPage"));
const EtiquetaPage = lazy(() => import("@/pages/envios/EtiquetaPage"));
const CartaPortePage = lazy(() => import("@/pages/envios/CartaPortePage"));
const ReciboPage = lazy(() => import("@/pages/envios/ReciboPage"));

// Previews
const EtiquetasPreview = lazy(() => import("@/pages/envios/EtiquetasPreview"));
const GuiaPreview = lazy(() => import("@/pages/envios/GuiaPreview"));
const CartaPortePreview = lazy(() => import("@/pages/envios/CartaPortePreview"));
const ReciboPreview = lazy(() => import("@/pages/envios/ReciboPreview"));

// Guías
const NuevaGuia = lazy(() => import("@/pages/guia/NuevaGuia"));
const EditarGuia = lazy(() => import("@/pages/guia/EditarGuia"));

// Incidencias
const DanosPage = lazy(() => import("@/pages/incidencias/DanosPage"));
const ReexpedicionesPage = lazy(() => import("@/pages/incidencias/ReexpedicionesPage"));
const SalidasPage = lazy(() => import("@/pages/incidencias/SalidasPage"));
const NuevaIncidencia = lazy(() => import("@/pages/incidencias/NuevaIncidencia"));
const EditarIncidencia = lazy(() => import("@/pages/incidencias/EditarIncidencia"));

// Operadores
const OperadoresList = lazy(() => import("@/pages/operadores/OperadoresList"));
const NuevoOperador = lazy(() => import("@/pages/operadores/NuevoOperador"));
const EditarOperador = lazy(() => import("@/pages/operadores/EditarOperador"));
const AsignacionRutas = lazy(() => import("@/pages/operadores/AsignacionRutas"));
const OperadorDetalle = lazy(() => import("@/pages/operadores/OperadorDetalle"));

// Pagos
const PagosList = lazy(() => import("@/pages/pagos/PagosList"));
const NuevoPago = lazy(() => import("@/pages/pagos/NuevoPago"));
const EditarPago = lazy(() => import("@/pages/pagos/EditarPago"));
const PagoSelectorPage = lazy(() => import("@/pages/pagos/PagoSelectorPage"));
const PagoForm = lazy(() => import("@/components/pagos/PagoForm"));

// Rastreo
const RastreoMapa = lazy(() => import("@/pages/rastreo/RastreoMapa"));
const RastreoCard = lazy(() => import("@/pages/rastreo/RastreoCard"));
const RastreoPage = lazy(() => import("@/pages/rastreo/RastreoPage"));

// Roles
const RolesList = lazy(() => import("@/pages/roles/RolesList"));
const NuevoRol = lazy(() => import("@/pages/roles/NuevoRol"));
const EditarRol = lazy(() => import("@/pages/roles/EditarRol"));

// Rutas
const RutasList = lazy(() => import("@/pages/rutas/RutasList"));
const NuevaRuta = lazy(() => import("@/pages/rutas/NuevaRuta"));
const EditarRuta = lazy(() => import("@/pages/rutas/EditarRuta"));

// Unidades
const UnidadesList = lazy(() => import("@/pages/unidades/UnidadesList"));
const NuevaUnidad = lazy(() => import("@/pages/unidades/NuevaUnidad"));
const EditarUnidad = lazy(() => import("@/pages/unidades/EditarUnidad"));
const CombustiblePage = lazy(() => import("@/pages/mantenimiento/CombustiblePage"));
const ServiciosUnidadPage = lazy(() => import("@/pages/mantenimiento/ServiciosUnidadPage"));
const AlertasMantenimientoPage = lazy(() => import("@/pages/mantenimiento/AlertasMantenimientoPage"));
const DashboardMantenimientoPage = lazy(() => import("@/pages/mantenimiento/DashboardMantenimientoPage"));

// Usuarios
const UsuariosList = lazy(() => import("@/pages/usuarios/UsuariosList"));
const NuevoUsuario = lazy(() => import("@/pages/usuarios/NuevoUsuario"));
const EditarUsuario = lazy(() => import("@/pages/usuarios/EditarUsuario"));
const ResetPassword = lazy(() => import("@/pages/usuarios/ResetPassword"));

// Vehículos
const VehiculosList = lazy(() => import("@/pages/vehiculos/VehiculosList"));
const NuevaVehiculo = lazy(() => import("@/pages/vehiculos/NuevaVehiculo"));
const EditarVehiculo = lazy(() => import("@/pages/vehiculos/EditarVehiculo"));

// Centros operativos
const CentrosOperativosList = lazy(() => import("@/pages/centros/CentrosOperativosList"));
const NuevoCentroOperativo = lazy(() => import("@/pages/centros/NuevoCentroOperativo"));
const EditarCentroOperativo = lazy(() => import("@/pages/centros/EditarCentroOperativo"));

// Almacén
const InventarioPage = lazy(() => import("@/pages/almacen/InventarioPage"));
const DescargaPage = lazy(() => import("@/pages/almacen/DescargaPage"));
const ModificacionEstadoPage = lazy(() => import("@/pages/almacen/ModificacionEstadoPage"));

// Flota
const FlotaMantenimiento = lazy(() => import("@/pages/flota/FlotaMantenimiento"));
const FlotaNuevoVehiculo = lazy(() => import("@/pages/flota/FlotaNuevoVehiculo"));

// Facturación
const CentroOperativoPage = lazy(() => import("@/pages/facturacion/CentroOperativoPage"));
const ReportesFacturacionPage = lazy(() => import("@/pages/facturacion/ReportesFacturacionPage"));

// Entregas
const ListaEntregas = lazy(() => import("@/pages/entregas/ListaEntregas"));
const EntregaProceso = lazy(() => import("@/pages/entregas/EntregaProceso"));
const EntregaDomicilioList = lazy(() => import("@/pages/entregas/EntregaDomicilioList"));
const EntregaDomicilioProceso = lazy(() => import("@/pages/entregas/EntregaDomicilioProceso"));

// Administración
const CobranzaCreditosPage = lazy(() => import("@/pages/admin/CobranzaCreditosPage"));
const CortesCajaPage = lazy(() => import("@/pages/admin/CortesCajaPage"));
const CorteChoferesPage = lazy(() => import("@/pages/admin/CorteChoferesPage"));

// Operaciones
const AsignarGuiasPage = lazy(() => import("@/pages/operaciones/AsignarGuiasPage"));
const CargaRutasPage = lazy(() => import("@/pages/operaciones/CargaRutasPage"));
const DescargaOperacionesPage = lazy(() => import("@/pages/operaciones/DescargaOperacionesPage"));
const LlegadaAlmacenPage = lazy(() => import("@/pages/operaciones/LlegadaAlmacenPage"));

// Configuración
const Configuracion = lazy(() => import("@/pages/configuracion/Configuracion"));
const General = lazy(() => import("@/pages/configuracion/General"));
const Tarifas = lazy(() => import("@/pages/configuracion/Tarifas"));
const Usuarios = lazy(() => import("@/pages/configuracion/Usuarios"));
const Integraciones = lazy(() => import("@/pages/configuracion/Integraciones"));

// ===============================
// Router principal
// ===============================
export default function AppRouter() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* HOME */}
          <Route index element={<Inicio />} />

          {/* DASHBOARD */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/envios" element={<EnviosDashboard />} />
          <Route path="dashboard/operadores" element={<OperadoresDashboard />} />
          <Route path="dashboard/notificaciones" element={<NotificacionesDashboard />} />

          {/* CLIENTES */}
          <Route path="clientes" element={<ClientesList />} />
          <Route path="clientes/list" element={<ClientesList />} />
          <Route path="clientes/nuevo" element={<NuevoCliente />} />
          <Route path="clientes/editar/:id" element={<ClientesEditar />} />
          <Route path="clientes/eliminar/:id" element={<ClientesEliminar />} />

          {/* ENVÍOS */}
          <Route path="envios" element={<EnviosList />} />
          <Route path="envios/nuevo" element={<NuevoEnvio />} />
          <Route path="envios/editar/:id" element={<EditarEnvio />} />
          <Route path="envios/rastreo/:id" element={<RastreoEnvio />} />
          <Route path="envios/recibo-entrega" element={<ReciboEntrega />} />

          {/* COBRO / GUÍA / IMPRESIÓN */}
          <Route path="envios/:id/cobro" element={<CobroEnvioPage />} />
          <Route path="envios/:id/generar-guia" element={<GenerarGuiaPage />} />
          <Route path="envios/etiqueta" element={<EtiquetaPage />} />
          <Route path="envios/carta-porte" element={<CartaPortePage />} />
          <Route path="envios/recibo" element={<ReciboPage />} />

          {/* PREVIEWS */}
          <Route path="envios/preview-etiqueta" element={<EtiquetasPreview />} />
          <Route path="envios/preview-guia" element={<GuiaPreview />} />
          <Route path="envios/preview-carta-porte" element={<CartaPortePreview />} />
          <Route path="envios/preview-recibo" element={<ReciboPreview />} />

          {/* GUIAS */}
          <Route path="guias/nueva" element={<NuevaGuia />} />
          <Route path="guias/editar/:id" element={<EditarGuia />} />

          {/* INCIDENCIAS */}
          <Route path="incidencias/danos" element={<DanosPage />} />
          <Route path="incidencias/reexpediciones" element={<ReexpedicionesPage />} />
          <Route path="incidencias/salidas" element={<SalidasPage />} />
          <Route path="incidencias/nueva" element={<NuevaIncidencia />} />

          {/* OPERADORES */}
          <Route path="operadores" element={<OperadoresList />} />
          <Route path="operadores/nuevo" element={<NuevoOperador />} />
          <Route path="operadores/editar/:id" element={<EditarOperador />} />
          <Route path="operadores/detalle/:id" element={<OperadorDetalle />} />
          <Route path="operadores/asignacion" element={<AsignacionRutas />} />

          {/* PAGOS */}
          <Route path="pagos" element={<PagosList />} />
          <Route path="pagos/nuevo" element={<NuevoPago />} />
          <Route path="pagos/editar/:id" element={<EditarPago />} />
          <Route path="pagos/selector/:id" element={<PagoSelectorPage />} />
          <Route path="pagos/:id" element={<PagoForm />} />

          {/* RASTREO */}
          <Route path="rastreo/historial-guia" element={<RastreoMapa />} />
          <Route path="rastreo/paquetes" element={<RastreoPage />} />
          <Route path="rastreo/card" element={<RastreoCard />} />

          {/* ROLES */}
          <Route path="roles" element={<RolesList />} />
          <Route path="roles/nuevo" element={<NuevoRol />} />
          <Route path="roles/editar/:id" element={<EditarRol />} />

          {/* RUTAS */}
          <Route path="rutas" element={<RutasList />} />
          <Route path="rutas/nueva" element={<NuevaRuta />} />
          <Route path="rutas/editar/:id" element={<EditarRuta />} />

          {/* UNIDADES */}
          <Route path="unidades" element={<UnidadesList />} />
          <Route path="unidades/nueva" element={<NuevaUnidad />} />
          <Route path="unidades/editar/:id" element={<EditarUnidad />} />
          <Route path="mantenimiento/combustible" element={<CombustiblePage />} />
          <Route path="mantenimiento/servicios" element={<ServiciosUnidadPage />} />
          <Route path="mantenimiento/alertas" element={<AlertasMantenimientoPage />} />
          <Route path="mantenimiento/dashboard" element={<DashboardMantenimientoPage />} />

          {/* USUARIOS */}
          <Route path="usuarios" element={<UsuariosList />} />
          <Route path="usuarios/nuevo" element={<NuevoUsuario />} />
          <Route path="usuarios/editar/:id" element={<EditarUsuario />} />
          <Route path="usuarios/reset-password" element={<ResetPassword />} />

          {/* VEHÍCULOS */}
          <Route path="vehiculos" element={<VehiculosList />} />
          <Route path="vehiculos/nuevo" element={<NuevaVehiculo />} />
          <Route path="vehiculos/editar/:id" element={<EditarVehiculo />} />

          {/* CENTROS OPERATIVOS */}
          <Route path="centros" element={<CentrosOperativosList />} />
          <Route path="centros/nuevo" element={<NuevoCentroOperativo />} />
          <Route path="centros/editar/:id" element={<EditarCentroOperativo />} />

          {/* ALMACÉN */}
          <Route path="almacen/inventario" element={<InventarioPage />} />
          <Route path="almacen/descarga" element={<DescargaPage />} />
          <Route path="almacen/modificacion-estado" element={<ModificacionEstadoPage />} />

          {/* FLOTA */}
          <Route path="flota/mantenimiento" element={<FlotaMantenimiento />} />
          <Route path="flota/nuevos" element={<FlotaNuevoVehiculo />} />

          {/* FACTURACIÓN */}
          <Route path="facturacion/centro-operativo" element={<CentroOperativoPage />} />
          <Route path="facturacion/reportes" element={<ReportesFacturacionPage />} />

          {/* ENTREGAS */}
          <Route path="entregas" element={<ListaEntregas />} />
          <Route path="entregas/ocurre" element={<ListaEntregas />} />
          <Route path="entregas/:id" element={<EntregaProceso />} />
          <Route path="entregas/proceso/:id" element={<EntregaProceso />} />
          <Route path="entregas/domicilio" element={<EntregaDomicilioList />} />
          <Route path="entregas/domicilio/proceso/:id" element={<EntregaDomicilioProceso />} />

          {/* ADMINISTRACIÓN */}
          <Route path="admin/cobranza-creditos" element={<CobranzaCreditosPage />} />
          <Route path="admin/corte-caja-ocurre" element={<CortesCajaPage />} />
          <Route path="admin/corte-caja-ead" element={<CorteChoferesPage />} />

          {/* OPERACIONES */}
          <Route path="operaciones/asignar-guias" element={<AsignarGuiasPage />} />
          <Route path="operaciones/carga-rutas" element={<CargaRutasPage />} />
          <Route path="operaciones/descarga-rutas" element={<DescargaOperacionesPage />} />
          <Route path="operaciones/llegada-almacen" element={<LlegadaAlmacenPage />} />

          {/* CONFIGURACIÓN */}
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="configuracion/general" element={<General />} />
          <Route path="configuracion/tarifas" element={<Tarifas />} />
          <Route path="configuracion/usuarios" element={<Usuarios />} />
          <Route path="configuracion/integraciones" element={<Integraciones />} />

        </Route>
      </Routes>
    </Suspense>
  );
}
