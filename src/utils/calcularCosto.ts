// src/utils/tarifas.utils.ts
import {
  TARIFAS_PESO,
  TARIFA_8V,
  TARIFA_8P,
  SERVICIOS_ADICIONALES
} from "@/data/tarifas";

// ===============================
// Tipos
// ===============================
export interface ServiciosOpciones {
  cobranza?: boolean;
  acuse?: boolean;
  recoleccion?: boolean;
  seguro?: boolean;
  valorDeclarado?: number;
  tarifa?: number;
  flete?: number;
}

export interface CalculoCostoInput {
  peso: number;
  largo: number;
  ancho: number;
  alto: number;
  descuento: number;
  retieneIVA: boolean;
  cantidadPaquetes: number;
  servicios: ServiciosOpciones;
}

export interface CalculoCostoResultado {
  tarifaPeso: number | null;
  tarifaVolumen: number;
  excedente: number;
  adicionales: number;
  subtotal: number;
  descuentoAplicado: number;
  subtotalConDescuento: number;
  iva: number;
  retencion: number;
  totalUnitario: number;
  cantidadPaquetes: number;
  total: number;
}

// ===============================
// Cálculo de tarifas
// ===============================
export function calcularTarifaPorPeso(peso: number): number | null {
  for (const t of TARIFAS_PESO) {
    if (peso <= t.max) return t.precio;
  }
  return null;
}

export function calcularVolumenM3(
  largo: number,
  ancho: number,
  alto: number
): number {
  return (largo * ancho * alto) / 1_000_000;
}

export function calcularTarifaVolumetrica(m3: number): number {
  return m3 * TARIFA_8V.precioM3;
}

export function calcularExcedente(peso: number): number {
  if (peso <= 60) return 0;
  const extra = peso - 60;
  return extra * TARIFA_8P.precioKgExtra;
}

// ===============================
// Servicios adicionales
// ===============================
export function calcularServiciosAdicionales(
  opciones: ServiciosOpciones
): number {
  let total = 0;

  if (opciones.cobranza) total += SERVICIOS_ADICIONALES.cobranza;
  if (opciones.acuse) total += SERVICIOS_ADICIONALES.acuse;

  if (opciones.recoleccion) {
    if ((opciones.tarifa ?? 8) <= 6) {
      total += SERVICIOS_ADICIONALES.recoleccionT1aT6;
    } else {
      const porcentaje =
        (opciones.flete ?? 0) *
        SERVICIOS_ADICIONALES.recoleccionT7.porcentaje;

      total += Math.max(
        porcentaje,
        SERVICIOS_ADICIONALES.recoleccionT7.minimo
      );
    }
  }

  if (opciones.seguro && opciones.valorDeclarado) {
    total +=
      (opciones.valorDeclarado / 1000) *
      SERVICIOS_ADICIONALES.seguroPorMillar;
  }

  return total;
}

// ===============================
// Costo total
// ===============================
export function calcularCostoTotal(
  input: CalculoCostoInput
): CalculoCostoResultado {
  const {
    peso,
    largo,
    ancho,
    alto,
    descuento,
    retieneIVA,
    cantidadPaquetes,
    servicios
  } = input;

  const tarifaPeso = calcularTarifaPorPeso(peso);
  const m3 = calcularVolumenM3(largo, ancho, alto);
  const tarifaVolumen = calcularTarifaVolumetrica(m3);
  const excedente = calcularExcedente(peso);

  const flete = Math.max(tarifaPeso ?? 0, tarifaVolumen) + excedente;

  const adicionales = calcularServiciosAdicionales({
    ...servicios,
    tarifa: tarifaPeso
      ? TARIFAS_PESO.find(t => t.precio === tarifaPeso)?.id
      : 8,
    flete
  });

  const subtotal = flete + adicionales;

  const subtotalConDescuento =
    descuento > 0 ? subtotal - subtotal * (descuento / 100) : subtotal;

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
    total
  };
}
