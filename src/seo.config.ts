// ─────────────────────────────────────────────────────────────
// Configuración SEO central — EDITA AQUÍ cuando tengas el dominio.
// ─────────────────────────────────────────────────────────────

// Dominio final del sitio (sin barra al final).
export const SITE_URL = 'https://www.expansionholistica.com';

export const BUSINESS = {
  name: 'Expansión Holística — Maca Salvo',
  founder: 'Maca Salvo',
  phone: '+14036790889',
  whatsapp: 'https://wa.me/14036790889',
  instagram: 'https://www.instagram.com/expansion_holistiica',
  // Negocio de área de servicio (atiende en Calgary sin dirección pública + online).
  city: 'Calgary',
  region: 'AB',
  country: 'CA',
  image: '/foto_perfil_cuencos_.JPG',
  ogImage: '/og-image.jpg',
};

// Certificaciones oficiales de Maca (E-E-A-T: señal de autoridad para Google).
export const CREDENTIALS: string[] = [
  'Certified Sound Healing Practitioner',
  'Access Bars Facilitator',
  'Sacred Geometry & Karnak Pendulum Practitioner',
  'Reiki Master Level III',
  'Theta Healing Practitioner',
];

// Servicios reales del sitio (ES / EN) para el schema y el sitemap.
export const SERVICES: { es: string; en: string }[] = [
  { es: 'Access Bars', en: 'Access Bars' },
  { es: 'Baño de Sonido', en: 'Sound Bath' },
  { es: 'Limpieza con Péndulo Karnak', en: 'Karnak Pendulum Cleansing' },
  { es: 'Círculo de Mujeres', en: "Women's Circle" },
  { es: 'Armonización con Geometría Sagrada', en: 'Sacred Geometry Harmonization' },
  { es: 'Baño de Sonido Grupal Online', en: 'Online Group Sound Bath' },
  { es: 'Energía de Hogar o Negocio', en: 'Home or Business Energy Clearing' },
];

type Meta = { title: string; description: string; ogLocale: string; hreflang: string; path: string };

export const META: Record<'es' | 'en', Meta> = {
  es: {
    title:
      'Maca Salvo — Terapeuta Holística | Sanación con Sonido, Reiki y Energía (online en Chile · Calgary)',
    description:
      'Terapias holísticas con Maca Salvo: baño de sonido, Access Bars, Reiki y armonización energética. Sesiones online para Chile y Latinoamérica, y presenciales en Calgary, Canadá.',
    ogLocale: 'es_CL',
    hreflang: 'es-CL',
    path: '/',
  },
  en: {
    title:
      'Maca Salvo — Holistic Therapist in Calgary | Sound Healing, Reiki & Energy Work',
    description:
      'Holistic therapy with Maca Salvo: sound baths, Access Bars, Reiki and energy harmonization. In-person in Calgary, Canada and online sessions worldwide.',
    ogLocale: 'en_CA',
    hreflang: 'en-CA',
    path: '/en/',
  },
};
