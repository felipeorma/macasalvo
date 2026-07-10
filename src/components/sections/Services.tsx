import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Wifi, MapPin, Globe, ArrowRight, Zap, Music, Wind, Users, Star, Home, Sparkles, HeartHandshake } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { SERVICES_CONTENT, servicePath } from '../../services.data';

const TRUNCATE_AT = 160;

// Maps each homepage card to its dedicated service page.
const SLUG_BY_ID: Record<string, string> = {
  'access-bars': 'access-bars',
  'sound-bath': 'sound-bath',
  'karnak-personal': 'personal-energy-harmonization',
  'space-clearing': 'space-energy-clearing',
  'womens-circle': 'womens-circle',
  'sacred-geometry': 'sacred-geometry',
  'sound-bath-group': 'online-group-sound-bath',
  'tarot-reading': 'tarot-reading',
  'bioconstellation': 'bioconstellation',
};

function ServiceDescription({ text, accent, seeLess, seeMore }: { text: string; accent: string; seeLess: string; seeMore: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > TRUNCATE_AT;

  return (
    <div className="mb-4">
      <p className="font-sans text-sm font-light text-clay-400 leading-relaxed">
        {isLong && !expanded ? text.slice(0, TRUNCATE_AT).trimEnd() + '…' : text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className={`mt-1.5 text-xs font-sans tracking-wide ${accent} hover:opacity-70 transition-opacity underline underline-offset-2`}
        >
          {expanded ? seeLess : seeMore}
        </button>
      )}
    </div>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [6, -6]);
  const rotateY = useTransform(x, [-60, 60], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const serviceConfigs = [
  {
    id: 'access-bars',
    icon: Zap,
    nameKey: 'services.s1.name',
    descKey: 'services.s1.desc',
    priceKey: 'services.s1.price',
    modalityKey: 'services.modality.inperson',
    modalityIcon: MapPin,
    color: 'from-terracotta-100 to-rose-100',
    accent: 'text-terracotta-300',
    border: 'border-terracotta-200',
  },
  {
    id: 'sound-bath',
    icon: Music,
    nameKey: 'services.s2.name',
    descKey: 'services.s2.desc',
    priceKey: 'services.s2.price',
    modalityKey: 'services.modality.remote',
    modalityIcon: Globe,
    color: 'from-sage-100 to-sand-100',
    accent: 'text-sage-500',
    border: 'border-sage-200',
  },
  {
    id: 'karnak-personal',
    icon: Wind,
    nameKey: 'services.s8.name',
    descKey: 'services.s8.desc',
    priceKey: 'services.s8.price',
    modalityKey: 'services.modality.remoteonly',
    modalityIcon: Globe,
    color: 'from-gold-100 to-sand-200',
    accent: 'text-gold-400',
    border: 'border-gold-200',
  },
  {
    id: 'womens-circle',
    icon: Users,
    nameKey: 'services.s4.name',
    descKey: 'services.s4.desc',
    priceKey: 'services.s4.price',
    modalityKey: 'services.modality.remote',
    modalityIcon: Globe,
    color: 'from-rose-100 to-terracotta-100',
    accent: 'text-rose-400',
    border: 'border-rose-200',
  },
  {
    id: 'sacred-geometry',
    icon: Star,
    nameKey: 'services.s5.name',
    descKey: 'services.s5.desc',
    priceKey: 'services.s5.price',
    modalityKey: 'services.modality.remoteonly',
    modalityIcon: Globe,
    color: 'from-sand-100 to-beige-200',
    accent: 'text-sand-500',
    border: 'border-sand-300',
  },
  {
    id: 'sound-bath-group',
    icon: Users,
    nameKey: 'services.s6.name',
    descKey: 'services.s6.desc',
    priceKey: 'services.s6.price',
    modalityKey: 'services.modality.remoteonly',
    modalityIcon: Globe,
    color: 'from-sage-100 to-gold-100',
    accent: 'text-sage-500',
    border: 'border-sage-200',
  },
  {
    id: 'space-clearing',
    icon: Home,
    nameKey: 'services.s7.name',
    descKey: 'services.s7.desc',
    priceKey: 'services.s7.price',
    modalityKey: 'services.modality.remoteonly',
    modalityIcon: Globe,
    color: 'from-sage-100 to-sand-200',
    accent: 'text-sage-500',
    border: 'border-sage-200',
  },
  {
    id: 'tarot-reading',
    icon: Sparkles,
    nameKey: 'services.s9.name',
    descKey: 'services.s9.desc',
    priceKey: 'services.s9.price',
    modalityKey: 'services.modality.remoteonly',
    modalityIcon: Globe,
    color: 'from-rose-100 to-gold-100',
    accent: 'text-rose-400',
    border: 'border-rose-200',
  },
  {
    id: 'bioconstellation',
    icon: HeartHandshake,
    nameKey: 'services.s10.name',
    descKey: 'services.s10.desc',
    priceKey: 'services.s10.price',
    modalityKey: 'services.modality.remoteonly',
    modalityIcon: Globe,
    color: 'from-terracotta-100 to-sand-100',
    accent: 'text-terracotta-300',
    border: 'border-terracotta-200',
  },
];

const modalityBgMap: Record<string, string> = {
  'services.modality.inperson': 'bg-terracotta-100 text-terracotta-400',
  'services.modality.remote': 'bg-sage-100 text-sage-600',
  'services.modality.remoteonly': 'bg-gold-100 text-gold-500',
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t, lang } = useLang();

  return (
    <section id="services" className="relative py-28 lg:py-36 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, #F5EDD6 0%, #FAF5EC 50%, #EDE0C4 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="section-label">{t('services.label')}</span>
          <h2 className="font-serif text-5xl md:text-6xl text-clay-500 mt-4 mb-6">
            {t('services.title.1')}{' '}
            <em className="text-gradient not-italic">{t('services.title.2')}</em>
          </h2>
          <p className="font-sans font-light text-clay-400 max-w-xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
        >
          {[
            { labelKey: 'services.inperson', icon: MapPin, color: 'bg-terracotta-100 text-terracotta-400 border-terracotta-200' },
            { labelKey: 'services.online', icon: Wifi, color: 'bg-sage-100 text-sage-600 border-sage-200' },
            { labelKey: 'services.modality.remoteonly', icon: Globe, color: 'bg-gold-100 text-gold-500 border-gold-200' },
          ].map((b, i) => (
            <motion.span
              key={b.labelKey}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] tracking-widest uppercase font-sans border ${b.color}`}
            >
              <b.icon size={11} />
              {t(b.labelKey)}
            </motion.span>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {serviceConfigs.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={i === 2 ? 'md:col-span-2 xl:col-span-1' : ''}
            >
              <TiltCard className={`glass-card border ${service.border} overflow-hidden group hover:shadow-xl hover:shadow-sand-300/40 transition-shadow duration-300 h-full`}>
                {/* Animated top bar */}
                <motion.div
                  className={`h-1.5 w-full bg-gradient-to-r ${service.color}`}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <motion.div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center relative overflow-hidden`}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/40"
                        initial={{ y: '100%' }}
                        whileHover={{ y: '-100%' }}
                        transition={{ duration: 0.4 }}
                      />
                      <service.icon size={20} className={service.accent} />
                    </motion.div>
                    <span className={`text-[10px] px-3 py-1 rounded-full font-sans tracking-widest uppercase ${modalityBgMap[service.modalityKey] ?? 'bg-sand-100 text-sand-500'}`}>
                      {t(service.modalityKey)}
                    </span>
                  </div>

                  <a href={servicePath(SERVICES_CONTENT.find((s) => s.slugEn === SLUG_BY_ID[service.id])!, lang)}>
                    <h3 className="font-serif text-xl text-clay-500 mb-2 leading-snug hover:text-terracotta-300 transition-colors">{t(service.nameKey)}</h3>
                  </a>
                  {t(service.priceKey) && (
                    <p className={`font-sans text-sm font-semibold tracking-wide mb-3 ${service.accent}`}>
                      {t(service.priceKey)}
                    </p>
                  )}
                  <ServiceDescription text={t(service.descKey)} accent={service.accent} seeLess={t('services.see.less')} seeMore={t('services.see.more')} />

                  <motion.a
                    href={servicePath(SERVICES_CONTENT.find((s) => s.slugEn === SLUG_BY_ID[service.id])!, lang)}
                    className={`flex items-center gap-1.5 text-xs tracking-widest uppercase font-sans ${service.accent} hover:opacity-70 transition-opacity mt-2`}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {lang === 'es' ? 'Ver más' : 'Learn more'}
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                    >
                      <ArrowRight size={12} />
                    </motion.span>
                  </motion.a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
