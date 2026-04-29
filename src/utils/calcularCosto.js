import { TARIFAS_PESO, TARIFA_8V, TARIFA_8P, SERVICIOS_ADICIONALES } from "../data/tarifas";

export function calcularTarifaPorPeso(peso) {
  for (const t of TARIFAS_PESO) {
    if (peso <= t.max) return t.precio;
  }
  return null;
}

export function calcularVolumenM3(largo, ancho, alto) {
  return (largo * ancho * alto) / 1000000;
}

export function calcularTarifaVolumetrica(m3) {
  return m3 * TARIFA_8V.precioM3;
}

export function calcularExcedente(peso) {
  if (peso <= 60) return 0;
  const extra = peso - 60;
  return extra * TARIFA_8P.precioKgExtra;
}

export function calcularServiciosAdicionales(opciones) {
  let total = 0;

  if (opciones.cobranza) total += SERVICIOS_ADICIONALES.cobranza;
  if (opciones.acuse) total += SERVICIOS_ADICIONALES.acuse;

  if (opciones.recoleccion) {
    if (opciones.tarifa <= 6) {
      total += SERVICIOS_ADICIONALES.recoleccionT1aT6;
    } else {
      const porcentaje = opciones.flete * SERVICIOS_ADICIONALES.recoleccionT7.porcentaje;
      total += Math.max(porcentaje, SERVICIOS_ADICIONALES.recoleccionT7.minimo);
    }
  }

  if (opciones.seguro) {
    total += (opciones.valorDeclarado / 1000) * SERVICIOS_ADICIONALES.seguroPorMillar;
  }

  return total;
}

export function calcularCostoTotal({ peso, largo, ancho, alto, descuento, retieneIVA, cantidadPaquetes, servicios }) {
  const tarifaPeso = calcularTarifaPorPeso(peso);
  const m3 = calcularVolumenM3(largo, ancho, alto);
  const tarifaVolumen = calcularTarifaVolumetrica(m3);
  const excedente = calcularExcedente(peso);

  const flete = Math.max(tarifaPeso, tarifaVolumen) + excedente;

  const adicionales = calcularServiciosAdicionales({
    ...servicios,
    tarifa: tarifaPeso ? TARIFAS_PESO.find(t => t.precio === tarifaPeso)?.id : 8,
    flete,
  });

  const subtotal = flete + adicionales;

  const subtotalConDescuento =
    descuento > 0 ? subtotal - (subtotal * (descuento / 100)) : subtotal;

  const iva = subtotalConDescuento * 0.16;

  const retencion = retieneIVA ? subtotalConDescuento * 0.04 : 0;

  const totalUnitario = subtotalConDescuento + iva - retencion;

  const total = totalUnitario * cantidadPaquetes;

  return {
    tarifaPeso,
    tarifaVolumen,
    excedente,
    adicionales,
    subtotal,
    descuentoAplicado: descuento,
    subtotalConDescuento,
    iva,
    retencion,
    totalUnitario,
    cantidadPaquetes,
    total,
  };
}