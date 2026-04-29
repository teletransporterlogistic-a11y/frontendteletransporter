import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

export default function OperadorDetalle() {
  const { id } = useParams();
  const [operador, setOperador] = useState<any>(null);
  const [tab, setTab] = useState("info");
  const [loading, setLoading] = useState(true);

  // Modales
  const [modalVehiculo, setModalVehiculo] = useState(false);
  const [modalRuta, setModalRuta] = useState(false);

  // Datos para asignación
  const [vehiculos, setVehiculos] = useState<any[]>([]);
  const [rutas, setRutas] = useState<any[]>([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState("");
  const [rutaSeleccionada, setRutaSeleccionada] = useState("");

  useEffect(() => {
    cargar();
  }, [id]);

  const cargar = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/operadores/${id}`);
      setOperador(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar operador");
    } finally {
      setLoading(false);
    }
  };

  const abrirModalVehiculo = async () => {
    try {
      const res = await api.get("/vehiculos");
      setVehiculos(res.data.data || res.data);
      setModalVehiculo(true);
    } catch (err) {
      console.error(err);
      alert("Error al cargar vehículos");
    }
  };

  const abrirModalRuta = async () => {
    try {
      const res = await api.get("/rutas");
      setRutas(res.data.data || res.data);
      setModalRuta(true);
    } catch (err) {
      console.error(err);
      alert("Error al cargar rutas");
    }
  };

  const asignarVehiculo = async () => {
    if (!vehiculoSeleccionado) return alert("Selecciona un vehículo");

    try {
      await api.post(`/operadores/${id}/asignar-vehiculo`, {
        vehiculoId: Number(vehiculoSeleccionado)
      });

      alert("Vehículo asignado correctamente");
      setModalVehiculo(false);
      cargar();
    } catch (err) {
      console.error(err);
      alert("Error al asignar vehículo");
    }
  };

  const asignarRuta = async () => {
    if (!rutaSeleccionada) return alert("Selecciona una ruta");

    try {
      await api.post(`/operadores/${id}/asignar-ruta`, {
        rutaId: Number(rutaSeleccionada)
      });

      alert("Ruta asignada correctamente");
      setModalRuta(false);
      cargar();
    } catch (err) {
      console.error(err);
      alert("Error al asignar ruta");
    }
  };

  if (loading || !operador) {
    return <div className="p-6">Cargando operador...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">
        {operador.nombre} <span className="text-gray-500">#{operador.id}</span>
      </h1>

      <p className="text-gray-600 mb-6">
        Usuario: <strong>{operador.usuario}</strong> — Rol:{" "}
        <strong>{operador.rol?.nombre || "Sin rol"}</strong>
      </p>

      {/* BOTONES DE ACCIONES */}
      <div className="flex gap-4 mb-6">
        <button className="btn-primary" onClick={abrirModalVehiculo}>
          Asignar vehículo
        </button>

        <button className="btn-primary" onClick={abrirModalRuta}>
          Asignar ruta
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b mb-6">
        {[
          { id: "info", label: "Información general" },
          { id: "vehiculos", label: "Vehículos asignados" },
          { id: "rutas", label: "Rutas asignadas" },
          { id: "asignaciones", label: "Asignaciones" },
          { id: "incidencias", label: "Incidencias" },
          { id: "auditoria", label: "Auditoría" }
        ].map((t) => (
          <button
            key={t.id}
            className={`pb-2 ${
              tab === t.id
                ? "border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTENIDO DE TABS */}
      {tab === "info" && <InfoTab operador={operador} />}
      {tab === "vehiculos" && <VehiculosTab operador={operador} />}
      {tab === "rutas" && <RutasTab operador={operador} />}
      {tab === "asignaciones" && <AsignacionesTab operador={operador} />}
      {tab === "incidencias" && <IncidenciasTab operador={operador} />}
      {tab === "auditoria" && <AuditoriaTab operador={operador} />}

      {/* MODAL ASIGNAR VEHÍCULO */}
      {modalVehiculo && (
        <Modal title="Asignar vehículo" onClose={() => setModalVehiculo(false)}>
          <select
            className="input mb-4"
            value={vehiculoSeleccionado}
            onChange={(e) => setVehiculoSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un vehículo</option>
            {vehiculos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.placas} — {v.marca} {v.modelo}
              </option>
            ))}
          </select>

          <button className="btn-primary" onClick={asignarVehiculo}>
            Asignar
          </button>
        </Modal>
      )}

      {/* MODAL ASIGNAR RUTA */}
      {modalRuta && (
        <Modal title="Asignar ruta" onClose={() => setModalRuta(false)}>
          <select
            className="input mb-4"
            value={rutaSeleccionada}
            onChange={(e) => setRutaSeleccionada(e.target.value)}
          >
            <option value="">Seleccione una ruta</option>
            {rutas.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre}
              </option>
            ))}
          </select>

          <button className="btn-primary" onClick={asignarRuta}>
            Asignar
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ============================
   TABS
============================ */

function InfoTab({ operador }: any) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Información general</h2>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Nombre" value={operador.nombre} />
        <Field label="Usuario" value={operador.usuario} />
        <Field label="Rol" value={operador.rol?.nombre || "Sin rol"} />
        <Field label="Activo" value={operador.activo ? "Sí" : "No"} />
        <Field label="WhatsApp" value={operador.telefonoWhatsApp || "-"} />
        <Field label="SMS" value={operador.telefonoSMS || "-"} />
        <Field label="Noti WhatsApp" value={operador.notiWhatsApp ? "Sí" : "No"} />
        <Field label="Noti SMS" value={operador.notiSMS ? "Sí" : "No"} />
        <Field label="Noti Push" value={operador.notiPush ? "Sí" : "No"} />
      </div>
    </div>
  );
}

function VehiculosTab({ operador }: any) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Vehículos asignados</h2>

      {operador.vehiculos?.length === 0 && (
        <p className="text-gray-500">No tiene vehículos asignados.</p>
      )}

      {operador.vehiculos?.map((v: any) => (
        <div key={v.id} className="border p-3 rounded mb-2">
          <strong>{v.placas}</strong> — {v.modelo} ({v.marca})
        </div>
      ))}
    </div>
  );
}

function RutasTab({ operador }: any) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Rutas asignadas</h2>

      {operador.rutas?.length === 0 && (
        <p className="text-gray-500">No tiene rutas asignadas.</p>
      )}

      {operador.rutas?.map((r: any) => (
        <div key={r.id} className="border p-3 rounded mb-2">
          <strong>{r.nombre}</strong> — {r.descripcion}
        </div>
      ))}
    </div>
  );
}

function AsignacionesTab({ operador }: any) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Asignaciones</h2>

      {operador.asignaciones?.length === 0 && (
        <p className="text-gray-500">No tiene asignaciones.</p>
      )}

      {operador.asignaciones?.map((a: any) => (
        <div key={a.id} className="border p-3 rounded mb-2">
          Envío #{a.envioId} — Estado: {a.estado}
        </div>
      ))}
    </div>
  );
}

function IncidenciasTab({ operador }: any) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Incidencias del operador</h2>

      {operador.incidencia?.length === 0 && (
        <p className="text-gray-500">No tiene incidencias registradas.</p>
      )}

      {operador.incidencia?.map((i: any) => (
        <div key={i.id} className="border p-3 rounded mb-2">
          <strong>{i.tipo}</strong> — {i.descripcion}
        </div>
      ))}
    </div>
  );
}

function AuditoriaTab({ operador }: any) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Auditoría</h2>

      {operador.auditoriaOperador?.length === 0 && (
        <p className="text-gray-500">No hay registros de auditoría.</p>
      )}

      {operador.auditoriaOperador?.map((a: any) => (
        <div key={a.id} className="border p-3 rounded mb-2">
          {a.accion} — {new Date(a.fecha).toLocaleString()}
        </div>
      ))}
    </div>
  );
}

/* COMPONENTES REUTILIZABLES */

function Field({ label, value }: any) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Modal({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {children}

        <button className="btn-secondary mt-4" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
