import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../api/api";
import BotonRegresar from "../../components/BotonRegresar";
import "./EntregaDomicilioProceso.css";

export default function EntregaDomicilioProceso() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [envio, setEnvio] = useState(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [operadores, setOperadores] = useState([]);
  const [operadorId, setOperadorId] = useState("");
  const [foto, setFoto] = useState(null);
  const [gps, setGps] = useState(null);
  const [cargando, setCargando] = useState(true);

  const canvasRef = useRef(null);
  const [firmando, setFirmando] = useState(false);

  // ============================
  // CARGAR ENVÍO
  // ============================
  useEffect(() => {
    async function cargar() {
      try {
        const res = await api.get(`/envios/${id}/completo`);
        setEnvio(res.data);

        const ops = await api.get("/operadores");
        setOperadores(ops.data);

        if (location.state?.clienteSeleccionado) {
          setClienteSeleccionado(location.state.clienteSeleccionado);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, [id, location.state]);

  // ============================
  // CAPTURAR FIRMA
  // ============================
  function iniciarFirma() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let dibujando = false;

    canvas.onmousedown = () => (dibujando = true);
    canvas.onmouseup = () => (dibujando = false);
    canvas.onmousemove = (e) => {
      if (!dibujando) return;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(e.offsetX, e.offsetY, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    setFirmando(true);
  }

  function obtenerFirma() {
    const canvas = canvasRef.current;
    return canvas.toDataURL("image/png");
  }

  // ============================
  // CAPTURAR FOTO
  // ============================
  function tomarFoto(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result);
    reader.readAsDataURL(file);
  }

  // ============================
  // CAPTURAR GPS
  // ============================
  function obtenerGPS() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("No se pudo obtener la ubicación.")
    );
  }

  // ============================
  // ENTREGAR PAQUETE
  // ============================
  async function entregarPaquete() {
    if (!clienteSeleccionado) return alert("Selecciona un cliente.");
    if (!operadorId) return alert("Selecciona un operador.");
    if (!foto) return alert("Debes tomar una foto de evidencia.");
    if (!gps) return alert("Debes capturar la ubicación GPS.");
    if (!firmando) return alert("Debes capturar la firma del cliente.");

    const firma = obtenerFirma();

    // Si es FXC → ir a pago
    if (envio.pago_destino === true) {
      navigate(`/pagos/selector/${envio.id}`, {
        state: { envio, cliente: clienteSeleccionado },
      });
      return;
    }

    try {
      await api.post(`/envios/${envio.id}/entregar-domicilio`, {
        clienteId: clienteSeleccionado.id,
        operadorId,
        foto,
        firma,
        gps,
      });

      // Enviar WhatsApp
      await api.post("/whatsapp/enviar", {
        numero: envio.destinatarioTelefono,
        mensaje: `Su paquete con guía ${envio.guia} ha sido entregado exitosamente.`,
      });

      navigate(`/envios/preview-recibo`, {
        state: { envio, cliente: clienteSeleccionado },
      });
    } catch (err) {
      console.error(err);
      alert("Error al entregar.");
    }
  }

  if (cargando) return <div>Cargando...</div>;

  return (
    <div className="entrega-proceso-wrapper">

      <BotonRegresar />

      <h2>Entrega a domicilio</h2>

      {/* DATOS DEL ENVÍO */}
      <div className="card datos-envio">
        <h3>Datos del envío</h3>
        <p><strong>Guía:</strong> {envio.guia}</p>
        <p><strong>Destinatario:</strong> {envio.destinatarioNombre}</p>
        <p><strong>Dirección:</strong> {envio.destinatarioDireccion}</p>
        <p><strong>Peso:</strong> {envio.peso} kg</p>
      </div>

      {/* SELECCIÓN DE OPERADOR */}
      <div className="card">
        <h3>Operador que entrega</h3>
        <select value={operadorId} onChange={(e) => setOperadorId(e.target.value)}>
          <option value="">Seleccionar operador</option>
          {operadores.map((op) => (
            <option key={op.id} value={op.id}>{op.nombre}</option>
          ))}
        </select>
      </div>

      {/* CLIENTE QUE RECIBE */}
      <div className="card verificacion">
        <h3>Cliente que recibe</h3>

        {clienteSeleccionado ? (
          <p className="ok">✔ {clienteSeleccionado.nombre}</p>
        ) : (
          <p className="alerta">⚠ No seleccionado</p>
        )}

        <div className="acciones-seleccion">
          <button
            className="btn-primary"
            onClick={() =>
              navigate("/clientes/list?selectMode=true", {
                state: { fromEntrega: envio.id },
              })
            }
          >
            Seleccionar cliente
          </button>

          <button
            className="btn-secondary"
            onClick={() =>
              navigate(`/clientes/nuevo?fromEntrega=${envio.id}&nombre=${envio.destinatarioNombre}`)
            }
          >
            Registrar cliente nuevo
          </button>
        </div>
      </div>

      {/* FOTO */}
      <div className="card">
        <h3>Foto de evidencia</h3>
        <input type="file" accept="image/*" onChange={tomarFoto} />
        {foto && <img src={foto} alt="evidencia" className="foto-preview" />}
      </div>

      {/* GPS */}
      <div className="card">
        <h3>Ubicación GPS</h3>
        <button className="btn-primary" onClick={obtenerGPS}>
          Obtener ubicación
        </button>

        {gps && (
          <p className="ok">
            ✔ Lat: {gps.lat} — Lng: {gps.lng}
          </p>
        )}
      </div>

      {/* FIRMA */}
      <div className="card">
        <h3>Firma del cliente</h3>

        <canvas ref={canvasRef} width={300} height={150} className="firma-canvas" />

        {!firmando && (
          <button className="btn-primary" onClick={iniciarFirma}>
            Iniciar firma
          </button>
        )}
      </div>

      {/* ACCIONES */}
      <div className="acciones-entrega">
        <button
          className="btn-primary btn-entregar"
          onClick={entregarPaquete}
        >
          Confirmar entrega
        </button>

        <button className="btn-secondary" onClick={() => navigate("/entregas/domicilio")}>
          Cancelar
        </button>
      </div>

    </div>
  );
}
