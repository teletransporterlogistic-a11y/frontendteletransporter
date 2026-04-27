// TARIFAS POR PESO (T1 a T7)
export const TARIFAS_PESO = [
  { id: 1, max: 5, precio: 120 },
  { id: 2, max: 10, precio: 157 },
  { id: 3, max: 20, precio: 204 },
  { id: 4, max: 30, precio: 243 },
  { id: 5, max: 40, precio: 308 },
  { id: 6, max: 50, precio: 418 },
  { id: 7, max: 60, precio: 550 },
];

// TARIFA 8V — Volumétrica por metro cúbico
export const TARIFA_8V = {
  precioM3: 2120,
};

// TARIFA 8P — Excedente por kg arriba de 60 kg
export const TARIFA_8P = {
  precioKgExtra: 22,
};

// SERVICIOS ADICIONALES
export const SERVICIOS_ADICIONALES = {
  cobranza: 100, // Cobranza por cuenta del destinatario
  acuse: 50, // Acuse de recibo
  recoleccionT1aT6: 50, // Recolección para tarifas 1 a 6
  recoleccionT7: {
    porcentaje: 0.12, // 12% del flete
    minimo: 210, // Mínimo de $210
  },
  seguroPorMillar: 35, // Seguro por cada $1000 declarados
};