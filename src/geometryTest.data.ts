import type { Lang } from './context/LanguageContext';

export type SolidKey = 'tetrahedron' | 'cube' | 'octahedron' | 'icosahedron' | 'dodecahedron';

export const SOLID_ORDER: SolidKey[] = ['tetrahedron', 'cube', 'octahedron', 'icosahedron', 'dodecahedron'];

interface SolidText {
  name: string;
  element: string;
  faces: string;
  essence: string;
  blurb: string;
  message: string;
  balance: string;
  invitation: string;
  support: string;
}

export interface SolidInfo {
  color: string;
  es: SolidText;
  en: SolidText;
}

export const SOLIDS: Record<SolidKey, SolidInfo> = {
  tetrahedron: {
    color: '#C4714A',
    es: {
      name: 'Tetraedro',
      element: 'Fuego',
      faces: '4 caras triangulares',
      essence: 'Voluntad · Acción · Transformación',
      blurb:
        'El sólido más simple y dinámico: la chispa inicial. Se asocia con la voluntad, la acción y la transformación.',
      message:
        'El Tetraedro es el sólido del Fuego: la forma más simple y la primera chispa de la creación. Su energía se asocia con la voluntad, el coraje y la capacidad de transformar. Que aparezca como tu sólido guía habla de un momento de impulso: algo dentro de ti quiere moverse, comenzar o dejar atrás lo que ya cumplió su ciclo.',
      balance:
        'Tu fuego pide dirección. Cuando se dispersa puede convertirse en prisa, tensión o agotamiento; cuando se enfoca, se vuelve una determinación luminosa. Recuerda que incluso el fuego necesita aire y descanso para mantenerse encendido.',
      invitation:
        'Esta semana, elige una sola intención y dale tus primeros pasos. Antes de dormir, escribe qué sientes que ya puedes soltar y qué quieres encender.',
      support: 'Tu Fuego te acompaña con impulso y ganas de transformar: úsalo para dar el primer paso.',
    },
    en: {
      name: 'Tetrahedron',
      element: 'Fire',
      faces: '4 triangular faces',
      essence: 'Will · Action · Transformation',
      blurb:
        'The simplest and most dynamic solid: the initial spark. It is associated with will, action, and transformation.',
      message:
        'The Tetrahedron is the solid of Fire: the simplest form and the first spark of creation. Its energy is associated with will, courage, and the capacity to transform. Having it as your guiding solid speaks of a moment of momentum: something within you wants to move, begin, or leave behind what has completed its cycle.',
      balance:
        'Your fire asks for direction. When it scatters it can turn into hurry, tension, or exhaustion; when it focuses, it becomes a luminous determination. Remember that even fire needs air and rest to stay lit.',
      invitation:
        'This week, choose a single intention and take your first steps toward it. Before bed, write down what you feel you can now let go of and what you want to ignite.',
      support: 'Your Fire accompanies you with momentum and the desire to transform: use it to take the first step.',
    },
  },
  cube: {
    color: '#9A6B3F',
    es: {
      name: 'Cubo',
      element: 'Tierra',
      faces: '6 caras cuadradas',
      essence: 'Estabilidad · Enraizamiento · Seguridad',
      blurb:
        'Orden, solidez y confianza. Se asocia con el enraizamiento, la estabilidad y la seguridad.',
      message:
        'El Cubo, o Hexaedro, es el sólido de la Tierra: orden, solidez y confianza. Su energía se asocia con el enraizamiento, la paciencia y la sensación de tener un lugar firme donde apoyarte. Que sea tu sólido guía sugiere que tu sistema pide calma, estructura y volver a lo esencial: el cuerpo, el hogar y los ritmos simples.',
      balance:
        'Tu tierra pide cuidado y movimiento suave. Cuando se endurece puede volverse rigidez o resistencia al cambio; cuando se nutre, es una base fértil donde todo puede crecer. Permítete avanzar paso a paso, sin exigirte velocidad.',
      invitation:
        'Dedica unos minutos al día a sentir tus pies sobre el suelo y respirar profundo, o camina en contacto con la naturaleza. Ordena un pequeño rincón de tu casa como gesto de cuidado.',
      support: 'Tu Tierra te ofrece una base firme: apóyate en tus rutinas y en tu cuerpo.',
    },
    en: {
      name: 'Cube',
      element: 'Earth',
      faces: '6 square faces',
      essence: 'Stability · Grounding · Security',
      blurb: 'Order, solidity, and trust. It is associated with grounding, stability, and security.',
      message:
        'The Cube, or Hexahedron, is the solid of Earth: order, solidity, and trust. Its energy is associated with grounding, patience, and the feeling of having firm ground to stand on. Having it as your guiding solid suggests that your system is asking for calm, structure, and a return to the essentials: your body, your home, and simple rhythms.',
      balance:
        'Your earth asks for care and gentle movement. When it hardens it can become rigidity or resistance to change; when it is nourished, it is fertile ground where anything can grow. Allow yourself to move step by step, without demanding speed of yourself.',
      invitation:
        'Spend a few minutes each day feeling your feet on the ground and breathing deeply, or walk in contact with nature. Tidy a small corner of your home as an act of care.',
      support: 'Your Earth offers you firm ground: lean on your routines and on your body.',
    },
  },
  octahedron: {
    color: '#6E8460',
    es: {
      name: 'Octaedro',
      element: 'Aire',
      faces: '8 caras triangulares',
      essence: 'Equilibrio · Armonía · Corazón',
      blurb:
        'Dos pirámides en equilibrio, arriba y abajo. Se asocia con la armonía, la comunicación y el corazón.',
      message:
        'El Octaedro es el sólido del Aire: dos pirámides que se encuentran en equilibrio, arriba y abajo, dar y recibir. Su energía se asocia con la armonía, la comunicación y la apertura del corazón. Que aparezca como tu sólido guía habla de un momento de buscar balance entre lo que piensas, sientes y expresas, y de cuidar la calidad de tus vínculos.',
      balance:
        'Tu aire pide espacio y honestidad. Cuando se desordena puede aparecer la dispersión, el pensar de más o el callar lo que sientes; cuando fluye, trae claridad y ligereza. Respirar con conciencia es tu aliado más directo.',
      invitation:
        'Regálate tres respiraciones profundas y conscientes, varias veces al día. Y esta semana, expresa con sinceridad y ternura algo que has estado guardando.',
      support: 'Tu Aire te invita a la armonía: respira, conversa y abre el corazón.',
    },
    en: {
      name: 'Octahedron',
      element: 'Air',
      faces: '8 triangular faces',
      essence: 'Balance · Harmony · Heart',
      blurb:
        'Two pyramids in balance, above and below. It is associated with harmony, communication, and the heart.',
      message:
        'The Octahedron is the solid of Air: two pyramids meeting in balance, above and below, giving and receiving. Its energy is associated with harmony, communication, and the opening of the heart. Having it as your guiding solid speaks of a moment of seeking balance between what you think, feel, and express, and of caring for the quality of your relationships.',
      balance:
        'Your air asks for space and honesty. When it becomes disordered, scattering, overthinking, or silencing what you feel can appear; when it flows, it brings clarity and lightness. Conscious breathing is your most direct ally.',
      invitation:
        'Gift yourself three deep, conscious breaths several times a day. And this week, express something you have been holding back with honesty and tenderness.',
      support: 'Your Air invites you to harmony: breathe, talk, and open your heart.',
    },
  },
  icosahedron: {
    color: '#5B8FA8',
    es: {
      name: 'Icosaedro',
      element: 'Agua',
      faces: '20 caras triangulares',
      essence: 'Fluidez · Emoción · Creatividad',
      blurb:
        'Una forma que fluye como las olas. Se asocia con las emociones, la creatividad y la adaptación.',
      message:
        'El Icosaedro es el sólido del Agua: veinte caras que se deslizan como las olas. Su energía se asocia con la sensibilidad, la creatividad y la capacidad de adaptarse y soltar. Que sea tu sólido guía sugiere que tu mundo emocional tiene algo que decirte, y que dejarlo fluir, sin juzgarlo, es parte de tu proceso en este momento.',
      balance:
        'Tu agua pide permiso para moverse. Cuando se estanca puede sentirse como pesadez o desborde; cuando fluye, limpia, renueva y crea. Confía en que las emociones, como las mareas, vienen y se van.',
      invitation:
        'Dedica un momento a estar con agua: una ducha consciente, un baño o una caminata junto al agua. Escribe o dibuja libremente lo que sientes, sin corregirlo.',
      support: 'Tu Agua te recuerda fluir: permite que lo que sientes se mueva y se exprese.',
    },
    en: {
      name: 'Icosahedron',
      element: 'Water',
      faces: '20 triangular faces',
      essence: 'Flow · Emotion · Creativity',
      blurb: 'A form that flows like waves. It is associated with emotions, creativity, and adaptation.',
      message:
        'The Icosahedron is the solid of Water: twenty faces gliding like waves. Its energy is associated with sensitivity, creativity, and the capacity to adapt and let go. Having it as your guiding solid suggests that your emotional world has something to tell you, and that letting it flow, without judgment, is part of your process right now.',
      balance:
        'Your water asks permission to move. When it stagnates it can feel like heaviness or overwhelm; when it flows, it cleanses, renews, and creates. Trust that emotions, like tides, come and go.',
      invitation:
        'Take a moment to be with water: a mindful shower, a bath, or a walk beside the water. Write or draw freely what you feel, without correcting it.',
      support: 'Your Water reminds you to flow: allow what you feel to move and be expressed.',
    },
  },
  dodecahedron: {
    color: '#8E6BA8',
    es: {
      name: 'Dodecaedro',
      element: 'Éter',
      faces: '12 caras pentagonales',
      essence: 'Espíritu · Intuición · Expansión',
      blurb:
        'La forma que, desde la antigüedad, se vincula con el cosmos. Se asocia con la intuición, el espíritu y la expansión.',
      message:
        'El Dodecaedro es el sólido del Éter, la quintaesencia: doce caras pentagonales que, desde la antigüedad, se vinculan con el cosmos y con lo que une todo. Su energía se asocia con la intuición, la conexión espiritual y la sensación de propósito. Que sea tu sólido guía habla de un momento de expansión y de escuchar la sabiduría de tu alma.',
      balance:
        'Tu éter pide silencio y también raíces. Cuando se desconecta del cuerpo puede sentirse como dispersión o distancia de lo cotidiano; integrado, trae claridad y sentido. Anclar lo que recibes en acciones simples te ayuda a habitarlo.',
      invitation:
        'Reserva diez minutos de silencio al día: sentada o sentado, con los ojos cerrados, escuchando tu respiración. Anota lo que aparece y luego da un paso pequeño y concreto.',
      support: 'Tu Éter te susurra intuición: dedica un momento al silencio y escucha.',
    },
    en: {
      name: 'Dodecahedron',
      element: 'Ether',
      faces: '12 pentagonal faces',
      essence: 'Spirit · Intuition · Expansion',
      blurb:
        'The form that, since antiquity, has been linked to the cosmos. It is associated with intuition, spirit, and expansion.',
      message:
        'The Dodecahedron is the solid of Ether, the quintessence: twelve pentagonal faces that, since antiquity, have been linked to the cosmos and to what unites everything. Its energy is associated with intuition, spiritual connection, and a sense of purpose. Having it as your guiding solid speaks of a moment of expansion and of listening to the wisdom of your soul.',
      balance:
        'Your ether asks for silence, and also for roots. When it disconnects from the body it can feel like scattering or distance from everyday life; integrated, it brings clarity and meaning. Anchoring what you receive in simple actions helps you inhabit it.',
      invitation:
        'Set aside ten minutes of silence each day: seated, eyes closed, listening to your breath. Note what appears, then take one small, concrete step.',
      support: 'Your Ether whispers intuition: take a moment for silence and listen.',
    },
  },
};

interface QuestionOption {
  solid: SolidKey;
  es: string;
  en: string;
}

interface Question {
  es: string;
  en: string;
  options: QuestionOption[];
}

// Cada opción suma un punto a un sólido. El orden de las opciones varía en cada
// pregunta para que la posición no sesgue el resultado.
export const QUESTIONS: Question[] = [
  {
    es: '¿Cómo te sientes hoy, en este momento?',
    en: 'How are you feeling today, right now?',
    options: [
      { solid: 'icosahedron', es: 'Muy sensible: las emociones van y vienen como olas.', en: 'Very sensitive: emotions come and go like waves.' },
      { solid: 'tetrahedron', es: 'Con mucha energía y ganas de moverme y hacer que las cosas pasen.', en: 'Full of energy, wanting to move and make things happen.' },
      { solid: 'dodecahedron', es: 'Con una sensación de expansión, como si algo más grande me estuviera llamando.', en: 'With a sense of expansion, as if something greater were calling me.' },
      { solid: 'cube', es: 'Necesito calma, estabilidad y sentir que piso firme.', en: 'I need calm, stability, and to feel firmly grounded.' },
      { solid: 'octahedron', es: 'Buscando equilibrio y armonía entre lo que pienso, siento y vivo.', en: 'Seeking balance and harmony between what I think, feel, and live.' },
    ],
  },
  {
    es: '¿Qué área de tu vida te pide más atención en este momento?',
    en: 'Which area of your life is asking for the most attention right now?',
    options: [
      { solid: 'cube', es: 'Mi cuerpo, mi hogar y mi seguridad material.', en: 'My body, my home, and my material security.' },
      { solid: 'dodecahedron', es: 'Mi camino espiritual y mi conexión con algo más grande.', en: 'My spiritual path and my connection with something greater.' },
      { solid: 'tetrahedron', es: 'Mis proyectos, mi propósito y mi motivación.', en: 'My projects, my purpose, and my motivation.' },
      { solid: 'octahedron', es: 'Mis vínculos y la forma en que me comunico.', en: 'My relationships and the way I communicate.' },
      { solid: 'icosahedron', es: 'Mis emociones y mi mundo interior.', en: 'My emotions and my inner world.' },
    ],
  },
  {
    es: '¿Qué elemento de la naturaleza te atrae más?',
    en: 'Which element of nature draws you in the most?',
    options: [
      { solid: 'octahedron', es: 'El viento, el cielo abierto, respirar profundo.', en: 'The wind, the open sky, breathing deeply.' },
      { solid: 'icosahedron', es: 'El mar, un río o la lluvia.', en: 'The sea, a river, or the rain.' },
      { solid: 'cube', es: 'Un bosque, las montañas, la tierra bajo mis pies.', en: 'A forest, the mountains, the earth beneath my feet.' },
      { solid: 'dodecahedron', es: 'El cielo estrellado, el espacio y el silencio.', en: 'The starry sky, space, and silence.' },
      { solid: 'tetrahedron', es: 'Una llama, el sol, una fogata.', en: 'A flame, the sun, a campfire.' },
    ],
  },
  {
    es: 'Cuando enfrentas un desafío, ¿cuál es tu reacción natural?',
    en: 'When you face a challenge, what is your natural reaction?',
    options: [
      { solid: 'dodecahedron', es: 'Me detengo a escuchar mi intuición y confío en que hay un sentido mayor.', en: 'I pause to listen to my intuition and trust there is a greater meaning.' },
      { solid: 'cube', es: 'Me tomo mi tiempo, hago un plan y avanzo paso a paso.', en: 'I take my time, make a plan, and move forward step by step.' },
      { solid: 'icosahedron', es: 'Dejo que las emociones fluyan y me adapto a lo que viene.', en: 'I let my emotions flow and adapt to what comes.' },
      { solid: 'tetrahedron', es: 'Actúo de inmediato y voy de frente.', en: 'I act right away and face it head-on.' },
      { solid: 'octahedron', es: 'Converso, escucho otros puntos de vista y busco un punto medio.', en: 'I talk it through, listen to other views, and look for middle ground.' },
    ],
  },
  {
    es: '¿Qué te gustaría sentir más en tu vida?',
    en: 'What would you like to feel more of in your life?',
    options: [
      { solid: 'tetrahedron', es: 'Fuerza, valentía y determinación.', en: 'Strength, courage, and determination.' },
      { solid: 'octahedron', es: 'Armonía, ligereza y apertura del corazón.', en: 'Harmony, lightness, and an open heart.' },
      { solid: 'dodecahedron', es: 'Conexión espiritual, intuición y propósito.', en: 'Spiritual connection, intuition, and purpose.' },
      { solid: 'icosahedron', es: 'Fluidez, sensibilidad y libertad emocional.', en: 'Flow, sensitivity, and emotional freedom.' },
      { solid: 'cube', es: 'Seguridad, enraizamiento y estabilidad.', en: 'Security, grounding, and stability.' },
    ],
  },
  {
    es: '¿Qué necesita tu cuerpo ahora?',
    en: 'What does your body need right now?',
    options: [
      { solid: 'icosahedron', es: 'Un baño, agua, un buen llanto o un abrazo.', en: 'A bath, water, a good cry, or a hug.' },
      { solid: 'dodecahedron', es: 'Silencio, meditación y quietud.', en: 'Silence, meditation, and stillness.' },
      { solid: 'octahedron', es: 'Respirar profundo y estirarme.', en: 'To breathe deeply and stretch.' },
      { solid: 'cube', es: 'Descansar, comer bien y caminar sobre la tierra.', en: 'To rest, eat well, and walk on the earth.' },
      { solid: 'tetrahedron', es: 'Moverme, sudar y liberar la energía acumulada.', en: 'To move, sweat, and release built-up energy.' },
    ],
  },
  {
    es: '¿Qué frase resuena más contigo hoy?',
    en: 'Which phrase resonates most with you today?',
    options: [
      { solid: 'octahedron', es: 'Quiero abrir mi corazón y vivir en equilibrio.', en: 'I want to open my heart and live in balance.' },
      { solid: 'tetrahedron', es: 'Es momento de transformar lo que ya no me sirve.', en: 'It is time to transform what no longer serves me.' },
      { solid: 'icosahedron', es: 'Me permito sentir y dejar fluir.', en: 'I allow myself to feel and let things flow.' },
      { solid: 'dodecahedron', es: 'Confío en la sabiduría de mi alma.', en: 'I trust the wisdom of my soul.' },
      { solid: 'cube', es: 'Necesito construir bases firmes para mi vida.', en: 'I need to build firm foundations for my life.' },
    ],
  },
];

export interface TestResult {
  counts: Record<SolidKey, number>;
  ranked: SolidKey[];
  primary: SolidKey;
  secondary: SolidKey | null;
}

// El sólido con más respuestas gana. En caso de empate gana el elegido más
// recientemente (lo que resuena en el último momento del test); si aún hay
// empate, el orden fijo de SOLID_ORDER.
export function scoreAnswers(answers: SolidKey[]): TestResult {
  const counts = { tetrahedron: 0, cube: 0, octahedron: 0, icosahedron: 0, dodecahedron: 0 } as Record<SolidKey, number>;
  const last = { tetrahedron: -1, cube: -1, octahedron: -1, icosahedron: -1, dodecahedron: -1 } as Record<SolidKey, number>;
  answers.forEach((a, i) => {
    counts[a] += 1;
    last[a] = i;
  });
  const ranked = [...SOLID_ORDER].sort(
    (a, b) => counts[b] - counts[a] || last[b] - last[a] || SOLID_ORDER.indexOf(a) - SOLID_ORDER.indexOf(b)
  );
  const secondary = counts[ranked[1]] > 0 ? ranked[1] : null;
  return { counts, ranked, primary: ranked[0], secondary };
}

export const TEST_META: Record<Lang, { title: string; description: string; h1: string }> = {
  es: {
    title: 'Test de Geometría Sagrada: tu Sólido Platónico — Maca Salvo',
    description:
      'Descubre qué Sólido Platónico resuena contigo hoy: Tetraedro, Cubo, Octaedro, Icosaedro o Dodecaedro. Test gratuito con mensaje personalizado.',
    h1: 'Test de Geometría Sagrada',
  },
  en: {
    title: 'Sacred Geometry Test: Find Your Platonic Solid — Maca Salvo',
    description:
      'Discover which Platonic Solid resonates with you today: Tetrahedron, Cube, Octahedron, Icosahedron or Dodecahedron. A free test with a personalized message.',
    h1: 'Sacred Geometry Test',
  },
};

export const COPY: Record<
  Lang,
  {
    home: string;
    crumb: string;
    subtitle: string;
    lead: string;
    chips: string[];
    start: string;
    aboutLabel: string;
    aboutTitle: string;
    aboutText: string;
    questionOf: (n: number, total: number) => string;
    back: string;
    resultLabel: string;
    messageLabel: string;
    balanceLabel: string;
    invitationLabel: string;
    mapLabel: string;
    secondLabel: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    ctaWhatsapp: string;
    ctaNote: string;
    retake: string;
    share: string;
    shareText: (name: string, element: string) => string;
    disclaimer: string;
  }
> = {
  es: {
    home: 'Inicio',
    crumb: 'Test de Geometría Sagrada',
    subtitle: 'Descubre tu Sólido Platónico',
    lead: 'Los Sólidos Platónicos son cinco formas geométricas perfectas que, desde la antigüedad, se consideran patrones fundamentales de la creación. Cada una se asocia con un elemento y una frecuencia distinta. Responde 7 preguntas con el corazón y descubre cuál resuena contigo hoy.',
    chips: ['7 preguntas', 'Menos de 2 minutos', 'Gratis'],
    start: 'Comenzar el test',
    aboutLabel: 'Geometría sagrada',
    aboutTitle: 'Los 5 Sólidos Platónicos',
    aboutText:
      'Son cinco formas tridimensionales perfectas, con todas sus caras iguales. Platón las vinculó con los elementos de la naturaleza y la geometría sagrada las considera la base de toda forma. Cada una invita a trabajar una cualidad distinta de tu campo energético.',
    questionOf: (n, total) => `Pregunta ${n} de ${total}`,
    back: 'Atrás',
    resultLabel: 'Tu sólido guía',
    messageLabel: 'El mensaje para ti',
    balanceLabel: 'Para mantener tu equilibrio',
    invitationLabel: 'Tu invitación',
    mapLabel: 'Tu mapa de sólidos',
    secondLabel: 'Tu segundo sólido',
    ctaTitle: 'Agenda tu Activación de Geometría Sagrada',
    ctaText:
      'En la sesión, Maca selecciona los Sólidos Platónicos según lo que necesitas trabajar y los activa mediante visualización guiada y trabajo energético consciente. Tu resultado de hoy es un buen punto de partida para conversar. La sesión es online, desde la comodidad de tu espacio.',
    ctaButton: 'Agenda tu Activación de Geometría Sagrada',
    ctaWhatsapp: 'Tengo dudas: escríbeme por WhatsApp',
    ctaNote: 'Pago seguro con Stripe. Después del pago, Maca te contactará por WhatsApp o correo para coordinar el día y la hora de tu sesión.',
    retake: 'Repetir el test',
    share: 'Compartir mi resultado',
    shareText: (name, element) => `Mi sólido platónico es el ${name} (${element}). Descubre el tuyo:`,
    disclaimer:
      'Este test es una herramienta de autoconocimiento e inspiración. No es un diagnóstico y no reemplaza la atención médica ni psicológica.',
  },
  en: {
    home: 'Home',
    crumb: 'Sacred Geometry Test',
    subtitle: 'Discover your Platonic Solid',
    lead: 'The Platonic Solids are five perfect geometric forms that, since antiquity, have been regarded as fundamental patterns of creation. Each one is associated with a different element and frequency. Answer 7 questions with your heart and discover which one resonates with you today.',
    chips: ['7 questions', 'Under 2 minutes', 'Free'],
    start: 'Start the test',
    aboutLabel: 'Sacred geometry',
    aboutTitle: 'The 5 Platonic Solids',
    aboutText:
      'They are five perfect three-dimensional forms, with all their faces identical. Plato linked them to the elements of nature, and sacred geometry regards them as the foundation of all form. Each one invites you to work with a different quality of your energy field.',
    questionOf: (n, total) => `Question ${n} of ${total}`,
    back: 'Back',
    resultLabel: 'Your guiding solid',
    messageLabel: 'Your message',
    balanceLabel: 'To keep your balance',
    invitationLabel: 'Your invitation',
    mapLabel: 'Your map of solids',
    secondLabel: 'Your second solid',
    ctaTitle: 'Book your Sacred Geometry Activation',
    ctaText:
      'In the session, Maca selects the Platonic Solids according to what you need to work on and activates them through guided visualization and conscious energy work. Today’s result is a good starting point for the conversation. The session is online, from the comfort of your own space.',
    ctaButton: 'Book your Sacred Geometry Activation',
    ctaWhatsapp: 'I have questions: message me on WhatsApp',
    ctaNote: 'Secure payment with Stripe. After payment, Maca will contact you via WhatsApp or email to coordinate the day and time of your session.',
    retake: 'Retake the test',
    share: 'Share my result',
    shareText: (name, element) => `My Platonic Solid is the ${name} (${element}). Discover yours:`,
    disclaimer:
      'This test is a tool for self-knowledge and inspiration. It is not a diagnosis and does not replace medical or psychological care.',
  },
};
