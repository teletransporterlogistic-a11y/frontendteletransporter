import { useForm } from "react-hook-form";
import { useEffect } from "react";

type Props = {
  initial?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;

  onBuscarRemitente: (callback: (cliente: any) => void) => void;
  onBuscarDestinatario: (callback: (cliente: any) => void) => void;
};

const RFC_GENERICO = "XXXX000000XX0";
const CORREO_GENERICO = "correo@correo.com";

// 🔥 Limpia campos prohibidos que rompen Prisma 5
function limpiarInitial(initial: any) {
  if (!initial) return initial;

  const copia = { ...initial };

  delete copia.estadoActualId;
  delete copia.operadorId;
  delete copia.cliente;
  delete copia.operador;
  delete copia.estadoDeEnvio;

  return copia;
}

function EnvioForm({
  initial,
  onSubmit,
  loading,
  onBuscarRemitente,
  onBuscarDestinatario,
}: Props) {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      guia: "",
      clienteId: null,

      // REMITENTE
      remitenteNombre: "",
      remitenteTelefono: "",
      remitenteCelular: "",
      remitenteCorreo: "",
      remitenteRFC: "",
      remitenteCalle: "",
      remitenteNumero: "",
      remitenteColonia: "",
      remitenteCiudad: "",
      remitenteEstado: "",
      remitenteCP: "",
      remitenteMunicipio: "",

      descuento: 0,

      // DESTINATARIO
      destinatarioNombre: "",
      destinatarioTelefono: "",
      destinatarioCelular: "",
      destinatarioCorreo: "",
      destinatarioRFC: "",
      destinatarioCalle: "",
      destinatarioNumero: "",
      destinatarioColonia: "",
      destinatarioCiudad: "",
      destinatarioEstado: "",
      destinatarioCP: "",
      destinatarioMunicipio: "",

      // PAQUETE
      cantidadPaquetes: 1,
      peso: 0,
      largo: 0,
      ancho: 0,
      alto: 0,
      descripcionContenido: "",
      valorDeclarado: 0,

      // SERVICIOS ADICIONALES
      pago_destino: false,
      acuse: false,
      cobrese_o_devuelvase: false,
      recoleccion: false,

      ...(limpiarInitial(initial) ?? {}),
    },
  });

  // ============================================================
  // 🔥 1. RESTAURAR FORMULARIO DESDE LOCALSTORAGE
  // ============================================================
  useEffect(() => {
    const saved = localStorage.getItem("envio_form");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        reset(data);
      } catch (e) {
        console.error("Error cargando envio_form:", e);
      }
    }
  }, [reset]);

  // ============================================================
  // 🔥 2. GUARDAR AUTOMÁTICAMENTE EN LOCALSTORAGE
  // ============================================================
  const formValues = watch();
  useEffect(() => {
    localStorage.setItem("envio_form", JSON.stringify(formValues));
  }, [formValues]);

  // ============================================================
  // 🔥 SUBMIT
  // ============================================================
  const submit = (data: any) => {
    onSubmit(data);
  };

  // ============================================================
  // 🔥 AUTOCOMPLETAR REMITENTE DESDE CLIENTE
  // ============================================================
  const autocompletarRemitente = (c: any) => {
    setValue("clienteId", c.id);

    setValue("remitenteNombre", c.nombre || "");
    setValue("remitenteRFC", c.rfc || RFC_GENERICO);
    setValue("remitenteCalle", c.calle || "");
    setValue("remitenteNumero", c.numero || "");

    setValue("remitenteColonia", c.colonias || "");

    setValue("remitenteCiudad", c.ciudadFinal || c.ciudad || "");
    setValue("remitenteEstado", c.estadoFinal || c.estado || "");
    setValue("remitenteMunicipio", c.municipioFinal || c.municipio || "");

    setValue("remitenteCP", c.codigoPostal || "");

    setValue("remitenteTelefono", c.telefono || c.celular || "");
    setValue("remitenteCelular", c.celular || "");
    setValue("remitenteCorreo", c.correo || c.email || CORREO_GENERICO);

    setValue("descuento", c.descuento ?? 0);
  };

  // ============================================================
  // 🔥 AUTOCOMPLETAR DESTINATARIO DESDE CLIENTE
  // ============================================================
  const autocompletarDestinatario = (c: any) => {
    setValue("destinatarioNombre", c.nombre || "");
    setValue("destinatarioRFC", c.rfc || RFC_GENERICO);
    setValue("destinatarioCalle", c.calle || "");
    setValue("destinatarioNumero", c.numero || "");

    setValue("destinatarioColonia", c.colonias || "");

    setValue("destinatarioCiudad", c.ciudadFinal || c.ciudad || "");
    setValue("destinatarioEstado", c.estadoFinal || c.estado || "");
    setValue("destinatarioMunicipio", c.municipioFinal || c.municipio || "");

    setValue("destinatarioCP", c.codigoPostal || "");

    setValue("destinatarioTelefono", c.telefono || c.celular || "");
    setValue("destinatarioCelular", c.celular || "");
    setValue("destinatarioCorreo", c.correo || c.email || CORREO_GENERICO);
  };

  // ============================================================
  // 🔥 FORMULARIO COMPLETO
  // ============================================================
  return (
    <form onSubmit={handleSubmit(submit)} className="form">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        
        {/* REMITENTE */}
        <fieldset>
          <legend>Remitente</legend>

          <button
            type="button"
            onClick={() => onBuscarRemitente(autocompletarRemitente)}
            className="btn-primary"
          >
            Buscar remitente
          </button>

          <div><label>Nombre</label><input {...register("remitenteNombre")} /></div>
          <div><label>Teléfono</label><input {...register("remitenteTelefono")} /></div>
          <div><label>Celular</label><input {...register("remitenteCelular")} /></div>
          <div><label>Correo</label><input {...register("remitenteCorreo")} /></div>
          <div><label>RFC</label><input {...register("remitenteRFC")} /></div>
          <div><label>Calle</label><input {...register("remitenteCalle")} /></div>
          <div><label>Número</label><input {...register("remitenteNumero")} /></div>
          <div><label>Colonia</label><input {...register("remitenteColonia")} /></div>
          <div><label>Ciudad</label><input {...register("remitenteCiudad")} /></div>
          <div><label>Estado</label><input {...register("remitenteEstado")} /></div>
          <div><label>Municipio</label><input {...register("remitenteMunicipio")} /></div>
          <div><label>CP</label><input {...register("remitenteCP")} /></div>

          <div>
            <label>Descuento (%)</label>
            <input
              type="number"
              step="0.01"
              {...register("descuento", { valueAsNumber: true })}
            />
          </div>
        </fieldset>

        {/* DESTINATARIO */}
        <fieldset>
          <legend>Destinatario</legend>

          <button
            type="button"
            onClick={() => onBuscarDestinatario(autocompletarDestinatario)}
            className="btn-primary"
          >
            Buscar destinatario
          </button>

          <div><label>Nombre</label><input {...register("destinatarioNombre")} /></div>
          <div><label>Teléfono</label><input {...register("destinatarioTelefono")} /></div>
          <div><label>Celular</label><input {...register("destinatarioCelular")} /></div>
          <div><label>Correo</label><input {...register("destinatarioCorreo")} /></div>
          <div><label>RFC</label><input {...register("destinatarioRFC")} /></div>
          <div><label>Calle</label><input {...register("destinatarioCalle")} /></div>
          <div><label>Número</label><input {...register("destinatarioNumero")} /></div>
          <div><label>Colonia</label><input {...register("destinatarioColonia")} /></div>
          <div><label>Ciudad</label><input {...register("destinatarioCiudad")} /></div>
          <div><label>Estado</label><input {...register("destinatarioEstado")} /></div>
          <div><label>Municipio</label><input {...register("destinatarioMunicipio")} /></div>
          <div><label>CP</label><input {...register("destinatarioCP")} /></div>
        </fieldset>
      </div>

      {/* DIMENSIONES */}
      <fieldset>
        <legend>Dimensiones</legend>

        <div><label>Cantidad de paquetes</label>
          <input
            type="number"
            min={1}
            {...register("cantidadPaquetes", { valueAsNumber: true })}
          />
        </div>

        <div><label>Peso</label>
          <input type="number" {...register("peso", { valueAsNumber: true })} />
        </div>
        <div><label>Largo</label>
          <input type="number" {...register("largo", { valueAsNumber: true })} />
        </div>
        <div><label>Ancho</label>
          <input type="number" {...register("ancho", { valueAsNumber: true })} />
        </div>
        <div><label>Alto</label>
          <input type="number" {...register("alto", { valueAsNumber: true })} />
        </div>
        <div><label>Descripción del contenido</label>
          <input {...register("descripcionContenido")} />
        </div>
        <div><label>Valor declarado</label>
          <input
            type="number"
            {...register("valorDeclarado", { valueAsNumber: true })}
          />
        </div>
      </fieldset>

      {/* SERVICIOS ADICIONALES */}
      <fieldset>
        <legend>Servicios adicionales</legend>

        <label>
          <input type="checkbox" {...register("pago_destino")} /> Pago en destino
        </label>
        <label>
          <input type="checkbox" {...register("acuse")} /> Acuse
        </label>
        <label>
          <input type="checkbox" {...register("cobrese_o_devuelvase")} /> Cóbrese o
          devuélvase
        </label>
        <label>
          <input type="checkbox" {...register("recoleccion")} /> Recolección
        </label>
      </fieldset>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Procesando..." : "Continuar"}
      </button>
    </form>
  );
}

export default EnvioForm;
