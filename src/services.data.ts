import { Zap, Music, Wind, Users, Star, Home, Sparkles, HeartHandshake, type LucideIcon } from 'lucide-react';
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
    slugEs: 'armonizacion-energetica-personal',
    slugEn: 'personal-energy-harmonization',
    icon: Wind,
    color: 'from-gold-100 to-sand-200',
    accent: 'text-gold-400',
    border: 'border-gold-200',
    nameEs: 'Armonización Energética Personal con Péndulo Karnak',
    nameEn: 'Personal Energy Harmonization with Karnak Pendulum',
    priceEs: '$60 · sesión online',
    priceEn: '$60 · online session',
    modalityEs: 'A distancia (online)',
    modalityEn: 'Remote (online)',
    metaTitleEs: 'Armonización Energética Personal con Péndulo Karnak (Online) — Maca Salvo',
    metaTitleEn: 'Personal Energy Harmonization with Karnak Pendulum (Online) — Maca Salvo',
    metaDescEs:
      'Sesión a distancia de armonización energética personal con péndulo Karnak: identifica bloqueos y desequilibrios y armoniza tu campo vibracional. Incluye informe detallado. Online para Chile y el mundo.',
    metaDescEn:
      'Remote personal energy harmonization with the Karnak pendulum: identify blockages and imbalances and harmonize your vibrational field. Includes a detailed report. Available online worldwide.',
    introEs: `Sesión a distancia de Armonización Energética Personal con Péndulo Karnak. Es una sesión profunda de aproximadamente 60 minutos, enfocada en identificar bloqueos, desequilibrios energéticos y posibles energías densas externas que puedan estar influyendo en tu bienestar. A través del Péndulo Karnak se realiza una evaluación energética para armonizar tu campo vibracional y favorecer una mayor sensación de claridad, equilibrio, ligereza y expansión.`,
    introEn: `A remote Personal Energy Harmonization session with the Karnak Pendulum. This is a deep session of approximately 60 minutes, focused on identifying blockages, energetic imbalances, and possible dense external energies that may be affecting your well-being. Using the Karnak Pendulum, an energetic assessment is performed to harmonize your vibrational field and support a greater sense of clarity, balance, lightness, and expansion.`,
    benefitsEs: [
      'Identifica bloqueos y desequilibrios energéticos',
      'Armoniza tu campo vibracional',
      'Mayor claridad, equilibrio, ligereza y expansión',
      'Incluye informe detallado con recomendaciones',
    ],
    benefitsEn: [
      'Identifies blockages and energetic imbalances',
      'Harmonizes your vibrational field',
      'Greater clarity, balance, lightness, and expansion',
      'Includes a detailed report with recommendations',
    ],
    expectEs: `Para realizar la sesión, Maca solo necesita tu nombre completo y fecha de nacimiento. La sesión dura aproximadamente 60 minutos y no necesitas conectarte en vivo. Al finalizar, recibirás un informe detallado con los aspectos energéticos observados, el trabajo realizado y recomendaciones para apoyar la integración del proceso.`,
    expectEn: `To carry out the session, Maca only needs your full name and date of birth. The session lasts approximately 60 minutes and you don't need to be online live. Afterwards, you'll receive a detailed report with the energetic aspects observed, the work performed, and recommendations to support the integration of the process.`,
  },
  {
    slugEs: 'limpieza-energetica-de-ambientes',
    slugEn: 'space-energy-clearing',
    icon: Home,
    color: 'from-sage-100 to-gold-100',
    accent: 'text-sage-500',
    border: 'border-sage-200',
    nameEs: 'Limpieza Energética de Ambientes',
    nameEn: 'Space Energy Clearing',
    priceEs: '$85 · sesión online',
    priceEn: '$85 · online session',
    modalityEs: 'A distancia (online)',
    modalityEn: 'Remote (online)',
    metaTitleEs: 'Limpieza Energética de Ambientes a Distancia | Hogares y Negocios — Maca Salvo',
    metaTitleEn: 'Remote Space Energy Clearing | Homes & Businesses — Maca Salvo',
    metaDescEs:
      'Limpieza energética a distancia con péndulo Karnak para hogares, oficinas o negocios: libera bloqueos y vibraciones densas y armoniza tu espacio. Incluye informe detallado.',
    metaDescEn:
      'Remote energy clearing with the Karnak pendulum for homes, offices, or businesses: release blockages and dense vibrations and harmonize your space. Includes a detailed report.',
    introEs: `Esta es una sesión a distancia de Limpieza Energética con Péndulo Karnak, diseñada para armonizar la energía de hogares, oficinas o negocios, liberando bloqueos, cargas energéticas y vibraciones densas para favorecer un espacio de mayor equilibrio, paz y bienestar.`,
    introEn: `This is a remote Energy Clearing session with the Karnak Pendulum, designed to harmonize the energy of homes, offices, or businesses — releasing blockages, energetic charges, and dense vibrations to support a space of greater balance, peace, and well-being.`,
    benefitsEs: [
      'Armoniza la energía de hogares, oficinas o negocios',
      'Libera bloqueos, cargas energéticas y vibraciones densas',
      'Favorece un espacio de mayor equilibrio, paz y bienestar',
      'Incluye informe detallado con recomendaciones',
    ],
    benefitsEn: [
      'Harmonizes the energy of homes, offices, or businesses',
      'Releases blockages, energetic charges, and dense vibrations',
      'Supports a space of greater balance, peace, and well-being',
      'Includes a detailed report with recommendations',
    ],
    expectEs: `Para realizar la sesión, Maca necesita la dirección del lugar y un plano sencillo del espacio (puede ser un dibujo hecho a mano) donde se identifiquen las principales áreas. Al finalizar, recibirás un informe detallado de la sesión, con los aspectos energéticos observados, el trabajo realizado y las recomendaciones para mantener la armonía del espacio.`,
    expectEn: `To carry out the session, Maca needs the address of the place and a simple floor plan (a hand-drawn sketch is fine) identifying the main areas. Afterwards, you'll receive a detailed report of the session with the energetic aspects observed, the work performed, and recommendations to maintain the harmony of the space.`,
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
  {
    slugEs: 'lectura-de-tarot',
    slugEn: 'tarot-reading',
    icon: Sparkles,
    color: 'from-rose-100 to-gold-100',
    accent: 'text-rose-400',
    border: 'border-rose-200',
    nameEs: 'Lectura de Tarot Remota — 5 Preguntas',
    nameEn: 'Remote Tarot Reading — 5 Questions',
    priceEs: '$20 · por WhatsApp',
    priceEn: '$20 · via WhatsApp',
    modalityEs: 'A distancia (WhatsApp)',
    modalityEn: 'Remote (WhatsApp)',
    metaTitleEs: 'Lectura de Tarot Online de 5 Preguntas por WhatsApp — Maca Salvo',
    metaTitleEn: 'Remote 5-Question Tarot Reading via WhatsApp — Maca Salvo',
    metaDescEs:
      'Lectura de tarot remota de 5 preguntas: recibe guía y claridad sobre las áreas de tu vida que quieras explorar. Respuestas en audio por WhatsApp para escucharlas cuando quieras.',
    metaDescEn:
      'Remote 5-question tarot reading: receive guidance and clarity on the areas of your life you want to explore. Answers as WhatsApp voice notes you can replay anytime.',
    introEs: `Recibe guía y claridad sobre las áreas de tu vida que desees explorar a través de una lectura personalizada de 5 preguntas. La sesión se realiza por WhatsApp, donde recibirás las respuestas a tus preguntas mediante audios, para que puedas escucharlos cuando lo necesites y volver a ellos cuantas veces quieras.`,
    introEn: `Receive guidance and clarity on the areas of your life you wish to explore through a personalized 5-question reading. The session takes place via WhatsApp, where you'll receive the answers to your questions as voice notes — so you can listen whenever you need and return to them as many times as you like.`,
    benefitsEs: [
      'Guía y claridad en las áreas que elijas explorar',
      '5 preguntas respondidas de forma personalizada',
      'Respuestas en audio por WhatsApp',
      'Vuelve a escucharlas cuantas veces quieras',
    ],
    benefitsEn: [
      'Guidance and clarity on the areas you choose to explore',
      '5 questions answered in a personalized reading',
      'Answers delivered as WhatsApp voice notes',
      'Replay them as many times as you like',
    ],
    expectEs: `Después de reservar, envías tus 5 preguntas por WhatsApp. Maca realiza la lectura y te responde mediante audios personalizados, que quedan contigo para escucharlos cuando lo necesites.`,
    expectEn: `After booking, you send your 5 questions via WhatsApp. Maca performs the reading and replies with personalized voice notes, which are yours to keep and listen to whenever you need.`,
  },
  {
    slugEs: 'bioconstelacion',
    slugEn: 'bioconstellation',
    icon: HeartHandshake,
    color: 'from-terracotta-100 to-sand-100',
    accent: 'text-terracotta-300',
    border: 'border-terracotta-200',
    nameEs: 'Sesión de Bioconstelación 1:1',
    nameEn: '1:1 Bioconstellation Session',
    priceEs: '$60 · videollamada',
    priceEn: '$60 · video call',
    modalityEs: 'Online (videollamada)',
    modalityEn: 'Online (video call)',
    metaTitleEs: 'Sesión de Bioconstelación 1:1 Online — Maca Salvo',
    metaTitleEn: '1:1 Bioconstellation Session Online — Maca Salvo',
    metaDescEs:
      'Sesión individual de bioconstelación por videollamada (~60 min): explora el origen emocional y sistémico de desafíos, síntomas o patrones repetitivos y favorece tu transformación personal.',
    metaDescEn:
      'One-on-one bioconstellation session by video call (~60 min): explore the emotional and systemic origin of challenges, symptoms, or repetitive patterns and support your personal transformation.',
    introEs: `Una sesión individual por videollamada de aproximadamente 60 minutos, donde exploraremos el origen emocional y sistémico de los desafíos, síntomas o patrones repetitivos que estés experimentando. A través de un enfoque integrador, buscaremos identificar dinámicas inconscientes, creencias y emociones que puedan estar influyendo en tu bienestar, favoreciendo una mayor comprensión, liberación y transformación personal.`,
    introEn: `A one-on-one video call session of approximately 60 minutes, where we explore the emotional and systemic origin of the challenges, symptoms, or repetitive patterns you're experiencing. Through an integrative approach, we work to identify unconscious dynamics, beliefs, and emotions that may be influencing your well-being — supporting greater understanding, release, and personal transformation.`,
    benefitsEs: [
      'Explora el origen emocional y sistémico de tus desafíos',
      'Identifica dinámicas inconscientes, creencias y emociones',
      'Favorece comprensión, liberación y transformación',
      'Acompaña tu proceso de crecimiento personal',
    ],
    benefitsEn: [
      'Explores the emotional and systemic origin of your challenges',
      'Identifies unconscious dynamics, beliefs, and emotions',
      'Supports understanding, release, and transformation',
      'Accompanies your personal growth process',
    ],
    expectEs: `Nos encontramos por videollamada durante aproximadamente 60 minutos. En un espacio seguro y acompañado, exploramos juntos las dinámicas que puedan estar influyendo en tu bienestar, favoreciendo comprensión y liberación. Esta sesión acompaña tu proceso de crecimiento personal.`,
    expectEn: `We meet by video call for approximately 60 minutes. In a safe, supported space, we explore together the dynamics that may be influencing your well-being, fostering understanding and release. This session accompanies your personal growth process.`,
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
