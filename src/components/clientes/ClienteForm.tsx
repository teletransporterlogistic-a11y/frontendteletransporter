import { useEffect } from "react";
import { useCodigoPostal } from "../../hooks/codigos-postales/useCodigoPostal";
import { DomiciliosAdicionales } from "../domicilios/DomiciliosAdicionales";

export function ClienteForm({
  form,
  errors,
  updateField,
  addDomicilio,
  updateDomicilio,
  onSubmit,
  loading,
}) {
  const cpData = useCodigoPostal(form.codigoPostal);

  // ===============================
  // Autocompletar datos del CP
  // ===============================
  useEffect(() => {
    if (!form.codigoPostal || form.codigoPostal.length !== 5) return;
    if (!cpData) return;

    if (cpData.ciudad && cpData.ciudad !== form.ciudad) {
      updateField("ciudad", cpData.ciudad);
    }

    if (cpData.estado && cpData.estado !== form.estado) {
      updateField("estado", cpData.estado);
    }

    if (cpData.municipio && cpData.municipio !== form.municipio) {
      updateField("municipio", cpData.municipio);
    }

    if (cpData.municipioId && cpData.municipioId !== form.municipioId) {
      updateField("municipioId", cpData.municipioId);
    }
  }, [form.codigoPostal, cpData]);

  const ciudadFinal = cpData?.ciudad || form.ciudad;
  const estadoFinal = cpData?.estado || form.estado;
  const municipioFinal = cpData?.municipio || form.municipio;

  return (
    <form className="card nuevo-cliente-card" onSubmit={onSubmit}>
      <h3>Datos generales</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Tipo</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={(e) => updateField("tipo", e.target.value)}
          >
            <option value="">Selecciona</option>
            <option value="PERSONA_FISICA">Persona Física</option>
            <option value="PERSONA_MORAL">Persona Moral</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={(e) => updateField("nombre", e.target.value)}
          />
          {errors.nombre && <span className="error">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label>RFC</label>
          <input
            name="rfc"
            value={form.rfc}
            onChange={(e) => updateField("rfc", e.target.value)}
          />
        </div>
      </div>

      <h3>Dirección principal</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Calle</label>
          <input
            name="calle"
            value={form.calle}
            onChange={(e) => updateField("calle", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Número</label>
          <input
            name="numero"
            value={form.numero}
            onChange={(e) => updateField("numero", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Código Postal</label>
          <input
            name="codigoPostal"
            maxLength={5}
            value={form.codigoPostal}
            onChange={(e) => updateField("codigoPostal", e.target.value)}
          />
          {errors.codigoPostal && (
            <span className="error">{errors.codigoPostal}</span>
          )}
        </div>

        <div className="form-group">
          <label>Colonia</label>

          {cpData?.colonias?.length > 0 ? (
            <select
              name="colonias"
              value={form.colonias}
              onChange={(e) => updateField("colonias", e.target.value)}
            >
              <option value="">Selecciona una colonia</option>
              {cpData.colonias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          ) : (
            <input
              name="colonias"
              value={form.colonias}
              onChange={(e) => updateField("colonias", e.target.value)}
              placeholder="Escribe la colonia"
            />
          )}

          {errors.colonias && (
            <span className="error">{errors.colonias}</span>
          )}
        </div>

        <div className="form-group">
          <label>Ciudad</label>
          <input
            name="ciudad"
            value={ciudadFinal}
            readOnly={!!cpData?.ciudad}
            onChange={(e) => updateField("ciudad", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <input
            name="estado"
            value={estadoFinal}
            readOnly={!!cpData?.estado}
            onChange={(e) => updateField("estado", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Municipio</label>
          <input
            name="municipio"
            value={municipioFinal}
            readOnly={!!cpData?.municipio}
            onChange={(e) => updateField("municipio", e.target.value)}
          />
        </div>

        {/* Campo oculto para backend */}
        <input type="hidden" name="municipioId" value={form.municipioId || ""} />
      </div>

      <h3>Contacto</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Celular *</label>
          <input
            name="celular"
            value={form.celular}
            onChange={(e) => updateField("celular", e.target.value)}
            required
          />
          {errors.celular && <span className="error">{errors.celular}</span>}
        </div>

        <div className="form-group">
          <label>Teléfono 2</label>
          <input
            name="telefono2"
            value={form.telefono2}
            onChange={(e) => updateField("telefono2", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Correo</label>
          <input
            name="correo"
            value={form.correo}
            onChange={(e) => updateField("correo", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
      </div>

      <h3>Opciones fiscales</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Requiere factura</label>
          <input
            type="checkbox"
            name="requiereFactura"
            checked={form.requiereFactura}
            onChange={(e) => updateField("requiereFactura", e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label>Retención IVA</label>
          <input
            type="checkbox"
            name="retencionIVA"
            checked={form.retencionIVA}
            onChange={(e) => updateField("retencionIVA", e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label>Descuento (%)</label>
          <input
            type="number"
            name="descuento"
            value={form.descuento}
            onChange={(e) => updateField("descuento", e.target.value)}
            step="0.01"
          />
        </div>
      </div>

      <h3>Otros datos</h3>

      <div className="form-group">
        <label>Datos adicionales</label>
        <textarea
          name="datosAdicionales"
          value={form.datosAdicionales}
          onChange={(e) => updateField("datosAdicionales", e.target.value)}
        />
      </div>

      <h3>Domicilios adicionales</h3>

      <DomiciliosAdicionales
        domicilios={form.domicilios}
        actualizar={updateDomicilio}
        eliminar={() => {}}
      />

      <button type="button" className="btn-secondary" onClick={addDomicilio}>
        + Agregar domicilio
      </button>

      <button className="btn-primary btn-guardar" type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Crear Cliente"}
      </button>
    </form>
  );
}
