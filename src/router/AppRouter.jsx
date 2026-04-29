import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout.jsx";

/* HOME */
import Inicio from "../pages/inicio/Inicio";

/* DASHBOARD */
import Dashboard from "../pages/dashboard/Dashboard";

/* DASHBOARDS AVANZADOS */
import EnviosDashboard from "../pages/envios/EnviosDashboard";
import OperadoresDashboard from "../pages/operadores/OperadoresDashboard";
import NotificacionesDashboard from "../pages/notificaciones/NotificacionesDashboard";

/* CLIENTES */
import ClientesList from "../pages/clientes/ClientesList";
import NuevoCliente from "../pages/clientes/NuevoCliente";
import ClientesEditar from "../pages/clientes/ClientesEditar";
import ClientesEliminar from "../pages/clientes/ClientesEliminar";

/* ENVÍOS */
import EnviosList from "../pages/envios/EnviosList";
import NuevoEnvio from "../pages/envios/NuevoEnvio";
import EditarEnvio from "../pages/envios/EditarEnvio";
import RastreoEnvio from "../pages/envios/RastreoEnvio";
import EtiquetasPreview from "../pages/envios/EtiquetasPreview";
import CartaPortePreview from "../pages/envios/CartaPortePreview";
import ReciboPreview from "../pages/envios/ReciboPreview";
import ReciboEntrega from "../pages/envios/ReciboEntrega";

/* COBRO / GUÍA / IMPRESIÓN */
import CobroEnvioPage from "../pages/envios/CobroEnvioPage";
import GenerarGuiaPage from "../pages/envios/GenerarGuiaPage";
import EtiquetaPage from "../pages/envios/EtiquetaPage";
import CartaPortePage from "../pages/envios/CartaPortePage";
import ReciboPage from "../pages/envios/ReciboPage";

/* PREVIEWS */
import GuiaPreview from "../pages/envios/GuiaPreview";

/* GUIAS */
import NuevaGuia from "../pages/guia/NuevaGuia";
import EditarGuia from "../pages/guia/EditarGuia";

/* INCIDENCIAS */
import IncidenciasList from "../pages/incidencias/IncidenciasList.tsx";
import NuevaIncidencia from "../pages/incidencias/NuevaIncidencia.tsx";
import EditarIncidencia from "../pages/incidencias/EditarIncidencia.tsx";
import DanosPage from "../pages/incidencias/DanosPage.jsx";
import ReexpedicionesPage from "../pages/incidencias/ReexpedicionesPage.jsx";
import SalidasPage from "../pages/incidencias/SalidasPage.jsx";

/* OPERADORES */
import OperadoresList from "../pages/operadores/OperadoresList";
import NuevoOperador from "../pages/operadores/NuevoOperador";
import EditarOperador from "../pages/operadores/EditarOperador";
import AsignacionRutas from "../pages/operadores/AsignacionRutas";
import OperadorDetalle from "../pages/operadores/OperadorDetalle";

/* PAGOS */
import PagosList from "../pages/pagos/PagosList";
import NuevoPago from "../pages/pagos/NuevoPago";
import EditarPago from "../pages/pagos/EditarPago";
import PagoSelectorPage from "../pages/pagos/PagoSelectorPage";
import PagoForm from "../components/pagos/PagoForm";

/* RASTREO */
import RastreoMapa from "../pages/rastreo/RastreoMapa.tsx";
import RastreoCard from "../pages/rastreo/RastreoCard.jsx";
import RastreoPage from "../pages/rastreo/RastreoPage.jsx";

/* ROLES */
import RolesList from "../pages/roles/RolesList";
import NuevoRol from "../pages/roles/NuevoRol";
import EditarRol from "../pages/roles/EditarRol";

/* RUTAS */
import RutasList from "../pages/rutas/RutasList";
import NuevaRuta from "../pages/rutas/NuevaRuta";
import EditarRuta from "../pages/rutas/EditarRuta";

/* UNIDADES */
import UnidadesList from "../pages/unidades/UnidadesList";
import NuevaUnidad from "../pages/unidades/NuevaUnidad";
import EditarUnidad from "../pages/unidades/EditarUnidad";
import CombustiblePage from "../pages/mantenimiento/CombustiblePage";
import ServiciosUnidadPage from "../pages/mantenimiento/ServiciosUnidadPage";
import AlertasMantenimientoPage from "../pages/mantenimiento/AlertasMantenimientoPage";
import DashboardMantenimientoPage from "../pages/mantenimiento/DashboardMantenimientoPage";

/* USUARIOS */
import UsuariosList from "../pages/usuarios/UsuariosList";
import NuevoUsuario from "../pages/usuarios/NuevoUsuario";
import EditarUsuario from "../pages/usuarios/EditarUsuario";
import ResetPassword from "../pages/usuarios/ResetPassword.jsx";

/* VEHÍCULOS */
import VehiculosList from "../pages/vehiculos/VehiculosList";
import NuevaVehiculo from "../pages/vehiculos/NuevaVehiculo";
import EditarVehiculo from "../pages/vehiculos/EditarVehiculo";

/* CENTROS OPERATIVOS */
import CentrosOperativosList from "../pages/centros/CentrosOperativosList";
import NuevoCentroOperativo from "../pages/centros/NuevoCentroOperativo";
import EditarCentroOperativo from "../pages/centros/EditarCentroOperativo";

/* ALMACÉN */
import InventarioPage from "../pages/almacen/InventarioPage";
import DescargaPage from "../pages/almacen/DescargaPage";
import ModificacionEstadoPage from "../pages/almacen/ModificacionEstadoPage";

/* FLOTA */
import FlotaVehiculos from "../pages/flota/FlotaVehiculos";
import FlotaMantenimiento from "../pages/flota/FlotaMantenimiento";
import FlotaNuevoVehiculo from "../pages/flota/FlotaNuevoVehiculo";

/* FACTURACIÓN */
import CentroOperativoPage from "../pages/facturacion/CentroOperativoPage.jsx";
import ReportesFacturacionPage from "../pages/facturacion/ReportesFacturacionPage.jsx";

/* ENTREGAS */
import ListaEntregas from "../pages/entregas/ListaEntregas";
import EntregaProceso from "../pages/entregas/EntregaProceso";
import EntregaDomicilioList from "../pages/entregas/EntregaDomicilioList";
import EntregaDomicilioProceso from "../pages/entregas/EntregaDomicilioProceso";

/* ADMINISTRACIÓN */
import CobranzaCreditosPage from "../pages/admin/CobranzaCreditosPage";
import CortesCajaPage from "../pages/admin/CortesCajaPage";
import CorteChoferesPage from "../pages/admin/CorteChoferesPage";

/* OPERACIONES */
import AsignarGuiasPage from "../pages/operaciones/AsignarGuiasPage";
import CargaRutasPage from "../pages/operaciones/CargaRutasPage";
import DescargaOperacionesPage from "../pages/operaciones/DescargaOperacionesPage";
import LlegadaAlmacenPage from "../pages/operaciones/LlegadaAlmacenPage";

/* CONFIGURACIÓN */
import Configuracion from "../pages/configuracion/Configuracion.jsx";
import General from "../pages/configuracion/General.jsx";
import Tarifas from "../pages/configuracion/Tarifas.jsx";
import Usuarios from "../pages/configuracion/Usuarios.jsx";
import Integraciones from "../pages/configuracion/Integraciones.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* HOME */}
        <Route index element={<Inicio />} />

        {/* DASHBOARD GENERAL */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* DASHBOARDS AVANZADOS */}
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
        <Route path="/envios/recibo-entrega" element={<ReciboEntrega />} />

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

        {/* 🔥 SOLO ESTA ES LA RUTA CORRECTA */}
        <Route path="pagos/selector/:id" element={<PagoSelectorPage />} />

        {/* 🔥 PagoForm para envíos y entregas */}
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
        <Route path="/mantenimiento/combustible" element={<CombustiblePage />} />
        <Route path="/mantenimiento/servicios" element={<ServiciosUnidadPage />} />
        <Route path="/mantenimiento/alertas" element={<AlertasMantenimientoPage />} />
        <Route path="/mantenimiento/dashboard" element={<DashboardMantenimientoPage />} />

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
        <Route path="flota/unidades" element={<UnidadesList />} />
        <Route path="flota/unidades/nueva" element={<NuevaUnidad />} />
        <Route path="flota/mantenimiento" element={<FlotaMantenimiento />} />
        <Route path="flota/nuevos" element={<FlotaNuevoVehiculo />} />
        <Route path="flota/unidades/editar/:id" element={<EditarUnidad />} />

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
  );
}
