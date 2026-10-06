// Links de pago de Stripe que se usan en más de un lugar del sitio. Cada link tiene
// un monto fijo en Stripe: si cambia el precio, hay que crear un link nuevo y cambiarlo aquí.
export const SACRED_GEOMETRY_PAY_URL = 'https://buy.stripe.com/14A5kweR5e2G7SK2Zz7AI0j';

// Armonización Energética Personal con Péndulo Karnak ($85). Es también el "Diagnóstico Energético" del inicio.
export const KARNAK_PERSONAL_PAY_URL = 'https://buy.stripe.com/28E6oA24je2Gc902Zz7AI0i';

// Diagnóstico Terapéutico ($25, videollamada). Pegar aquí el link de pago de Stripe cuando exista:
// mientras esté vacío, el botón del inicio abre WhatsApp con el mensaje ya escrito.
export const THERAPEUTIC_DIAGNOSIS_PAY_URL = '';
