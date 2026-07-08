import { Zap, Music, Wind, Users, Star, type LucideIcon } from 'lucide-react';
import type { Lang } from './context/LanguageContext';

export interface ServiceContent {
  slugEs: string;
  slugEn: string;
  icon: LucideIcon;
  color: string;
  accent: string;
  border: string;
  nameEs: string;
  nameEn: string;
  priceEs: string;
  priceEn: string;
  modalityEs: string;
  modalityEn: string;
  metaTitleEs: string;
  metaTitleEn: string;
  metaDescEs: string;
  metaDescEn: string;
  introEs: string;
  introEn: string;
  benefitsEs: string[];
  benefitsEn: string[];
  expectEs: string;
  expectEn: string;
}

export const SERVICES_CONTENT: ServiceContent[] = [
  {
    slugEs: 'bano-de-sonido',
    slugEn: 'sound-bath',
    icon: Music,
    color: 'from-sage-100 to-sand-100',
    accent: 'text-sage-500',
    border: 'border-sage-200',
    nameEs: 'Baño de Sonido',
    nameEn: 'Sound Bath',
    priceEs: '$40 online · $60 presencial',
    priceEn: '$40 online · $60 in-person',
    modalityEs: 'Online y presencial en Calgary',
    modalityEn: 'Online and in-person in Calgary',
    metaTitleEs: 'Baño de Sonido con Cuencos de Cristal | Online y Calgary — Maca Salvo',
    metaTitleEn: 'Sound Bath with Crystal Bowls in Calgary & Online — Maca Salvo',
    metaDescEs:
      'Baño de sonido con cuencos alquímicos de cristal para liberar estrés y reconectar. Sesiones online para Chile y presenciales en Calgary, con Maca Salvo, practicante certificada.',
    metaDescEn:
      'Crystal singing bowl sound bath to release stress and restore balance. Online sessions worldwide and in-person in Calgary with Maca Salvo, certified Sound Healing practitioner.',
    introEs: `El baño de sonido con cuencos alquímicos de cristal es una experiencia vibracional profunda que utiliza frecuencias puras como herramienta de armonización del cuerpo, la mente y el campo energético. A través de la resonancia de los cuencos se genera un campo sonoro envolvente que favorece la liberación de tensiones, el descanso profundo y el restablecimiento del equilibrio interno. Es una de las terapias más buscadas por quienes quieren reducir el estrés y reconectar con su capacidad natural de autosanación, disponible online para Chile y Latinoamérica, y de forma presencial en Calgary.`,
    introEn: `A crystal singing bowl sound bath is a deeply restorative vibrational experience that uses pure sound frequencies to harmonize body, mind, and energy field. The resonance of the alchemical crystal bowls creates an immersive sound field that helps release tension, calm the nervous system, and restore inner balance. It is one of the most sought-after holistic therapies for reducing stress and reconnecting with your natural capacity to heal — available in-person in Calgary and online worldwide.`,
    benefitsEs: [
      'Reduce el estrés y la sobrecarga mental',
      'Libera tensiones acumuladas en el cuerpo',
      'Favorece el descanso profundo y la calma',
      'Reconecta con tu equilibrio y claridad interior',
    ],
    benefitsEn: [
      'Reduces stress and mental overload',
      'Releases tension stored in the body',
      'Promotes deep rest and calm',
      'Reconnects you with inner balance and clarity',
    ],
    expectEs: `Te recuestas cómodamente mientras Maca toca los cuencos de cristal. Las vibraciones envuelven tu cuerpo y llevan al sistema nervioso a un estado de calma profunda. No necesitas experiencia previa: solo disposición a recibir. En la versión online te guío para preparar un espacio tranquilo desde tu casa.`,
    expectEn: `You lie down comfortably while Maca plays the crystal bowls. The vibrations wash over your body and guide your nervous system into deep calm. No previous experience is needed — only openness to receive. For online sessions, I guide you to prepare a quiet space at home.`,
  },
  {
    slugEs: 'access-bars',
    slugEn: 'access-bars',
    icon: Zap,
    color: 'from-terracotta-100 to-rose-100',
    accent: 'text-terracotta-300',
    border: 'border-terracotta-200',
    nameEs: 'Access Bars',
    nameEn: 'Access Bars',
    priceEs: '$75 · presencial en Calgary',
    priceEn: '$75 · in-person in Calgary',
    modalityEs: 'Presencial en Calgary',
    modalityEn: 'In-person in Calgary',
    metaTitleEs: 'Access Bars en Calgary | Terapia de Liberación Energética — Maca Salvo',
    metaTitleEn: 'Access Bars in Calgary | Energy Release Therapy — Maca Salvo',
    metaDescEs:
      'Access Bars en Calgary con Maca Salvo, facilitadora certificada. Técnica suave con las manos que libera pensamientos y creencias limitantes para mayor claridad y calma.',
    metaDescEn:
      'Access Bars in Calgary with Maca Salvo, certified facilitator. A gentle hands-on technique that releases limiting thoughts and beliefs for greater ease, clarity, and calm.',
    introEs: `Access Bars es una técnica suave que se realiza con las manos sobre 32 puntos específicos de la cabeza, liberando la carga electromagnética de pensamientos, creencias y emociones limitantes. El resultado es una profunda sensación de relajación, espacio mental y claridad. Es ideal para quienes sienten agotamiento, ansiedad o saturación mental y buscan soltar patrones que ya no les sirven. Esta terapia se ofrece de forma presencial en Calgary con Maca Salvo, facilitadora certificada de Access Bars.`,
    introEn: `Access Bars is a gentle hands-on technique applied to 32 specific points on the head, releasing the electromagnetic charge of limiting thoughts, beliefs, and emotions. The result is deep relaxation, mental spaciousness, and clarity. It's ideal for anyone feeling burnt out, anxious, or mentally overloaded who wants to let go of patterns that no longer serve them. This therapy is offered in-person in Calgary with Maca Salvo, a certified Access Bars facilitator.`,
    benefitsEs: [
      'Libera pensamientos y creencias limitantes',
      'Calma la ansiedad y el agotamiento mental',
      'Genera una profunda sensación de relajación',
      'Aporta claridad, espacio y facilidad',
    ],
    benefitsEn: [
      'Releases limiting thoughts and beliefs',
      'Eases anxiety and mental burnout',
      'Creates a deep sense of relaxation',
      'Brings clarity, space, and ease',
    ],
    expectEs: `Te recuestas vestida y cómoda mientras Maca apoya suavemente sus manos en distintos puntos de tu cabeza. Muchas personas entran en un estado de relajación tan profundo que se duermen. Es una técnica no invasiva y reparadora. Solo disponible de forma presencial en Calgary.`,
    expectEn: `You lie down fully clothed and comfortable while Maca gently rests her hands on points on your head. Many people relax so deeply they fall asleep. It is non-invasive and restorative. Available in-person in Calgary only.`,
  },
  {
    slugEs: 'limpieza-pendulo-karnak',
    slugEn: 'karnak-pendulum-cleansing',
    icon: Wind,
    color: 'from-gold-100 to-sand-200',
    accent: 'text-gold-400',
    border: 'border-gold-200',
    nameEs: 'Limpieza con Péndulo Karnak',
    nameEn: 'Karnak Pendulum Cleansing',
    priceEs: '$60 · sesión a distancia',
    priceEn: '$60 · remote session',
    modalityEs: 'A distancia (online)',
    modalityEn: 'Remote (online)',
    metaTitleEs: 'Limpieza Energética con Péndulo Karnak a Distancia — Maca Salvo',
    metaTitleEn: 'Karnak Pendulum Energy Cleansing (Remote) — Maca Salvo',
    metaDescEs:
      'Limpieza energética a distancia con péndulo Karnak: armoniza tus chakras y campo energético. Incluye medición con biómetro y audio de devolución. Online para Chile y el mundo.',
    metaDescEn:
      'Remote Karnak pendulum energy cleansing to harmonize your chakras and energy field. Includes biometer measurement and a recorded summary. Available online worldwide.',
    introEs: `La sanación con péndulo Karnak es una sesión energética a distancia enfocada en la limpieza y armonización profunda del campo energético. Se trabaja la armonización de los chakras y la integración de los cuatro cuerpos (físico, emocional, mental y espiritual), favoreciendo orden interno, claridad y estabilidad. Al inicio y al final se realiza una medición con biómetro para observar los cambios en tu energía. Es ideal para quienes sienten cansancio energético, sobrecarga emocional o desconexión, y se ofrece de forma 100% online para Chile, Latinoamérica y el mundo.`,
    introEn: `Karnak pendulum healing is a remote energy session focused on deep cleansing and harmonization of your energy field. It works on balancing the chakras and integrating the four bodies (physical, emotional, mental, and spiritual), supporting inner order, clarity, and stability. A biometer measurement is taken at the start and end to observe the changes in your energy. It's ideal for anyone feeling energetically drained, emotionally overloaded, or disconnected — offered fully online, worldwide.`,
    benefitsEs: [
      'Limpia y armoniza tu campo energético',
      'Equilibra los chakras y los cuatro cuerpos',
      'Alivia el cansancio y la sobrecarga emocional',
      'Incluye medición con biómetro y audio de devolución',
    ],
    benefitsEn: [
      'Cleanses and harmonizes your energy field',
      'Balances the chakras and the four bodies',
      'Relieves energetic fatigue and emotional overload',
      'Includes biometer measurement and a recorded summary',
    ],
    expectEs: `La sesión es a distancia: no necesitas conectarte en vivo. Maca trabaja tu campo energético con el péndulo Karnak y, al finalizar, te entrega un audio con el detalle de lo trabajado, los hallazgos y recomendaciones para integrar el proceso.`,
    expectEn: `The session is remote — you don't need to be online live. Maca works on your energy field with the Karnak pendulum and, when finished, sends you an audio recording detailing what was worked on, the findings, and recommendations to integrate the process.`,
  },
  {
    slugEs: 'circulo-de-mujeres',
    slugEn: 'womens-circle',
    icon: Users,
    color: 'from-rose-100 to-terracotta-100',
    accent: 'text-rose-400',
    border: 'border-rose-200',
    nameEs: 'Círculo de Mujeres',
    nameEn: "Women's Circle",
    priceEs: '$25 · presencial',
    priceEn: '$25 · in-person',
    modalityEs: 'Presencial en Calgary',
    modalityEn: 'In-person in Calgary',
    metaTitleEs: 'Círculo de Mujeres en Calgary | Sanación en Comunidad — Maca Salvo',
    metaTitleEn: "Women's Circle in Calgary | Healing in Community — Maca Salvo",
    metaDescEs:
      'Círculo de mujeres en Calgary: un espacio sagrado para compartir, sanar y celebrar juntas. Rituales guiados y conexión auténtica con Maca Salvo.',
    metaDescEn:
      "Women's circle in Calgary: a sacred space to share, heal, and celebrate together. Guided rituals and authentic connection with Maca Salvo.",
    introEs: `El Círculo de Mujeres es un espacio sagrado donde mujeres se reúnen para compartir, sanar y celebrar juntas. A través de rituales guiados, conexión auténtica y sabiduría colectiva, se activa una sanación que va más allá del individuo. Es un encuentro para soltar, sostenerse en comunidad y recordar la fuerza de lo femenino. Se realiza de forma presencial en Calgary.`,
    introEn: `The Women's Circle is a sacred space where women gather to share, heal, and celebrate together. Through guided rituals, authentic connection, and collective wisdom, a healing is activated that goes beyond the individual. It's a gathering to release, be held in community, and remember the strength of the feminine. Held in-person in Calgary.`,
    benefitsEs: [
      'Conexión auténtica y sostén en comunidad',
      'Rituales guiados de sanación femenina',
      'Espacio seguro para compartir y soltar',
      'Sabiduría colectiva y celebración',
    ],
    benefitsEn: [
      'Authentic connection and community support',
      'Guided feminine healing rituals',
      'A safe space to share and release',
      'Collective wisdom and celebration',
    ],
    expectEs: `Llegas a un espacio preparado con intención. Maca guía rituales, dinámicas de compartir y momentos de conexión. No necesitas experiencia previa: solo venir con el corazón abierto. Se realiza de forma presencial en Calgary, en grupos reducidos.`,
    expectEn: `You arrive to a space prepared with intention. Maca guides rituals, sharing practices, and moments of connection. No previous experience is needed — just come with an open heart. Held in-person in Calgary, in small groups.`,
  },
  {
    slugEs: 'geometria-sagrada',
    slugEn: 'sacred-geometry',
    icon: Star,
    color: 'from-sand-100 to-beige-200',
    accent: 'text-sand-500',
    border: 'border-sand-300',
    nameEs: 'Armonización con Geometría Sagrada',
    nameEn: 'Sacred Geometry Harmonization',
    priceEs: '$40 · online',
    priceEn: '$40 · online',
    modalityEs: 'Online',
    modalityEn: 'Online',
    metaTitleEs: 'Armonización con Geometría Sagrada (Online) — Maca Salvo',
    metaTitleEn: 'Sacred Geometry Energy Harmonization (Online) — Maca Salvo',
    metaDescEs:
      'Activación energética con los Sólidos Platónicos y geometría sagrada. Libera bloqueos e integra mayor coherencia interna. Sesiones online con Maca Salvo.',
    metaDescEn:
      'Energy activation with the Platonic Solids and sacred geometry to release blockages and integrate inner coherence. Online sessions with Maca Salvo.',
    introEs: `La armonización con geometría sagrada es una activación energética personalizada que trabaja con los Sólidos Platónicos, las cinco formas consideradas patrones fundamentales de la creación. Cada figura contiene una frecuencia específica: algunas favorecen el enraizamiento, otras la liberación emocional, la claridad mental o la conexión interna. A través de visualización guiada y trabajo energético consciente, se facilita la liberación de bloqueos y la integración de estados de mayor coherencia. Se ofrece de forma online para Chile y el mundo.`,
    introEn: `Sacred geometry harmonization is a personalized energy activation that works with the Platonic Solids — the five forms considered fundamental patterns of creation. Each shape carries a specific frequency: some support grounding, others emotional release, mental clarity, or inner connection. Through guided visualization and conscious energy work, it helps release blockages and integrate states of greater inner coherence. Offered online worldwide.`,
    benefitsEs: [
      'Activación energética personalizada',
      'Libera bloqueos físicos, emocionales y mentales',
      'Favorece el enraizamiento y la claridad',
      'Integra mayor coherencia interna',
    ],
    benefitsEn: [
      'Personalized energy activation',
      'Releases physical, emotional, and mental blockages',
      'Supports grounding and clarity',
      'Integrates greater inner coherence',
    ],
    expectEs: `Tras una breve conversación, Maca selecciona los Sólidos Platónicos según lo que necesitas trabajar. Mediante visualización guiada y trabajo energético, la geometría sagrada actúa reorganizando y armonizando tu sistema energético. Es una sesión online, desde la comodidad de tu espacio.`,
    expectEn: `After a short conversation, Maca selects the Platonic Solids based on what you need to work on. Through guided visualization and energy work, sacred geometry reorganizes and harmonizes your energy system. It's an online session, from the comfort of your own space.`,
  },
  {
    slugEs: 'bano-de-sonido-grupal-online',
    slugEn: 'online-group-sound-bath',
    icon: Users,
    color: 'from-sage-100 to-gold-100',
    accent: 'text-sage-500',
    border: 'border-sage-200',
    nameEs: 'Baño de Sonido Grupal Online',
    nameEn: 'Online Group Sound Bath',
    priceEs: '$25 · online en vivo',
    priceEn: '$25 · live online',
    modalityEs: 'Online en vivo',
    modalityEn: 'Live online',
    metaTitleEs: 'Baño de Sonido Grupal Online en Vivo — Maca Salvo',
    metaTitleEn: 'Live Online Group Sound Bath — Maca Salvo',
    metaDescEs:
      'Baño de sonido grupal en vivo con cuencos de cristal, desde donde estés. Una experiencia de sanación colectiva accesible. Sesiones online con Maca Salvo.',
    metaDescEn:
      'A live online group sound bath with crystal bowls, from wherever you are. An accessible collective healing experience. Online sessions with Maca Salvo.',
    introEs: `El baño de sonido grupal online es una experiencia en vivo con cuencos alquímicos de cristal, realizada de forma remota. Te unes desde donde estés y te sumerges en frecuencias vibracionales puras que liberan el estrés, el peso emocional y la tensión mental, desde la comodidad de tu espacio. Es ideal para quienes se inician en la sanación con sonido o buscan una experiencia de sanación colectiva accesible. Disponible online para Chile, Latinoamérica y el mundo.`,
    introEn: `The online group sound bath is a live experience with alchemical crystal bowls, held remotely. You join from wherever you are and immerse yourself in pure vibrational frequencies that release stress, emotional weight, and mental tension — from the comfort of your own space. It's ideal for those new to sound healing or looking for an accessible collective healing experience. Available online worldwide.`,
    benefitsEs: [
      'Sanación con sonido desde tu casa',
      'Experiencia colectiva y accesible',
      'Libera estrés y tensión mental',
      'Ideal para quienes se inician',
    ],
    benefitsEn: [
      'Sound healing from your own home',
      'An accessible, collective experience',
      'Releases stress and mental tension',
      'Ideal for beginners',
    ],
    expectEs: `Te conectas en vivo a la hora agendada, te acomodas en un lugar tranquilo y te dejas envolver por el sonido de los cuencos. No necesitas experiencia. Es la forma más accesible de vivir un baño de sonido, en comunidad y desde cualquier lugar.`,
    expectEn: `You join live at the scheduled time, settle into a quiet spot, and let the sound of the bowls wash over you. No experience needed. It's the most accessible way to experience a sound bath — in community, from anywhere.`,
  },
];

export function getServiceByPath(pathname: string): { service: ServiceContent; lang: Lang } | null {
  const segments = pathname.split('/').filter(Boolean).map((s) => s.toLowerCase());
  // EN: /en/services/<slug>
  if (segments[0] === 'en' && segments[1] === 'services' && segments[2]) {
    const service = SERVICES_CONTENT.find((s) => s.slugEn === segments[2]);
    if (service) return { service, lang: 'en' };
  }
  // ES: /servicios/<slug>
  if (segments[0] === 'servicios' && segments[1]) {
    const service = SERVICES_CONTENT.find((s) => s.slugEs === segments[1]);
    if (service) return { service, lang: 'es' };
  }
  return null;
}

export function servicePath(service: ServiceContent, lang: Lang): string {
  return lang === 'en' ? `/en/services/${service.slugEn}` : `/servicios/${service.slugEs}`;
}
