import { motion, AnimatePresence, useReducedMotion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { ArrowDown, ChevronDown, Sparkles, Video, Wind } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { KARNAK_PERSONAL_PAY_URL, THERAPEUTIC_DIAGNOSIS_PAY_URL } from '../../payments';
import { BUSINESS } from '../../seo.config';
import { useRef, useEffect, useState } from 'react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

// Flower of Life SVG
function FlowerOfLife() {
  const R = 40;
  const cx = 200;
  const cy = 200;
  const angles = Array.from({ length: 6 }, (_, i) => (i * 60 * Math.PI) / 180);
  const inner = angles.map((a) => ({ x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) }));
  const outer = angles.map((a) => ({ x: cx + 2 * R * Math.cos(a), y: cy + 2 * R * Math.sin(a) }));
  const outerDiag = angles.map((a, i) => {
    const a2 = ((i * 60 + 30) * Math.PI) / 180;
    return { x: cx + 2 * R * Math.cos(a2), y: cy + 2 * R * Math.sin(a2) };
  });
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx={cx} cy={cy} r={R * 3.2} stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
      <circle cx={cx} cy={cy} r={R * 2.8} stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
      <circle cx={cx} cy={cy} r={R} stroke="currentColor" strokeWidth="1" opacity="0.9" />
      {inner.map((p, i) => (
        <circle key={`in-${i}`} cx={p.x} cy={p.y} r={R} stroke="currentColor" strokeWidth="1" opacity="0.9" />
      ))}
      {outer.map((p, i) => (
        <circle key={`out-${i}`} cx={p.x} cy={p.y} r={R} stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
      ))}
      {outerDiag.map((p, i) => (
        <circle key={`diag-${i}`} cx={p.x} cy={p.y} r={R} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      ))}
      <circle cx={cx} cy={cy} r={4} fill="currentColor" opacity="0.8" />
    </svg>
  );
}

// 3D Mandala SVG
function Mandala3D() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer rings */}
      <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      <circle cx="200" cy="200" r="170" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <circle cx="200" cy="200" r="30" stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
      {/* 12-petal flower */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 - 90) * Math.PI / 180;
        const x = 200 + 90 * Math.cos(a);
        const y = 200 + 90 * Math.sin(a);
        return <circle key={i} cx={x} cy={y} r="40" stroke="currentColor" strokeWidth="0.4" opacity="0.45" />;
      })}
      {/* Star lines */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 - 90) * Math.PI / 180;
        const x = 200 + 190 * Math.cos(a);
        const y = 200 + 190 * Math.sin(a);
        return <line key={i} x1="200" y1="200" x2={x} y2={y} stroke="currentColor" strokeWidth="0.3" opacity="0.3" />;
      })}
      {/* Inner geometry */}
      <polygon points="200,50 332,275 68,275" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5" />
      <polygon points="200,350 332,125 68,125" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5" />
      <polygon points="200,80 310,255 90,255" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.35" />
      <polygon points="200,320 310,145 90,145" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.35" />
      {/* Center dot */}
      <circle cx="200" cy="200" r="5" stroke="currentColor" strokeWidth="1" opacity="0.9" />
      <circle cx="200" cy="200" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

// Floating ambient orb
function FloatingOrb({ delay, size, x, y, color }: { delay: number; size: number; x: string; y: string; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, background: color, filter: 'blur(70px)', opacity: 0.3 }}
      animate={{ y: [0, -30, 0], x: [0, 14, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 9 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

type OfferTheme = {
  gradient: string;
  glow: string;
  glowSoft: string;
  btnText: string;
  payBtn: string;
  accent: string;
};

const THEMES: Record<'terra' | 'sage', OfferTheme> = {
  terra: {
    gradient: 'linear-gradient(135deg, #D4825A 0%, #B05A36 55%, #8C4428 100%)',
    glow: '0 18px 50px rgba(196,113,74,0.55)',
    glowSoft: '0 12px 30px rgba(196,113,74,0.3)',
    btnText: 'text-terracotta-400',
    payBtn: 'bg-terracotta-300 hover:bg-terracotta-400 hover:shadow-terracotta-200',
    accent: 'text-terracotta-300',
  },
  sage: {
    gradient: 'linear-gradient(135deg, #9CB88A 0%, #6E8460 55%, #506048 100%)',
    glow: '0 18px 50px rgba(110,132,96,0.55)',
    glowSoft: '0 12px 30px rgba(110,132,96,0.3)',
    btnText: 'text-sage-600',
    payBtn: 'bg-sage-500 hover:bg-sage-600 hover:shadow-sage-200',
    accent: 'text-sage-500',
  },
};

type OfferProps = {
  id: string;
  icon: typeof Wind;
  theme: keyof typeof THEMES;
  tag: string;
  title: string;
  desc: string;
  note: string;
  price: string;
  more: string;
  less: string;
  cta: string;
  href: string;
  open: boolean;
  onToggle: () => void;
  delay: number;
  floatDuration: number;
};

const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

// Tarjeta del inicio: al principio solo muestra el título y un botón; al tocarlo se despliega
// con la descripción, el precio y el botón de pago.
function Offer({ id, icon: Icon, theme, tag, title, desc, note, price, more, less, cta, href, open, onToggle, delay, floatDuration }: OfferProps) {
  const th = THEMES[theme];
  const calm = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: open || calm ? 0 : [0, -6, 0],
        boxShadow: open || calm ? th.glowSoft : [th.glowSoft, th.glow, th.glowSoft],
      }}
      transition={{
        opacity: { duration: 0.9, delay },
        scale: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
        y: open || calm ? { duration: 0.4 } : { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.9 },
        boxShadow: open || calm ? { duration: 0.4 } : { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.9 },
      }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-3xl text-center text-cream"
      style={{ background: th.gradient }}
    >
      {/* brillo que cruza la tarjeta */}
      {!calm && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }}
          animate={{ x: ['0%', '480%'] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut', delay: delay + 1.5 }}
        />
      )}
      {/* geometría sutil de fondo */}
      <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute -right-8 -top-8 w-40 h-40 text-white opacity-[0.12]" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="50" cy="50" r="20" /><circle cx="50" cy="30" r="20" /><circle cx="50" cy="70" r="20" />
        <circle cx="32.7" cy="40" r="20" /><circle cx="67.3" cy="40" r="20" /><circle cx="32.7" cy="60" r="20" /><circle cx="67.3" cy="60" r="20" />
      </svg>

      <div className="relative px-6 pt-7 pb-6 md:px-7">
        <div className="relative mx-auto mb-4 w-14 h-14 flex items-center justify-center">
          {!calm && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-white/70"
              animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: delay + 0.5 }}
            />
          )}
          <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40">
            <Icon size={24} />
          </span>
        </div>

        <h2 className="font-serif text-3xl md:text-[34px] leading-tight mb-5">{title}</h2>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`offer-${id}`}
          className={`inline-flex items-center gap-2 px-7 py-3 rounded-full bg-cream ${th.btnText} font-sans text-xs tracking-[0.2em] uppercase font-medium shadow-lg shadow-black/10 transition-transform duration-300 hover:-translate-y-0.5 active:scale-95`}
        >
          {open ? less : more}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.35 }} className="flex">
            <ChevronDown size={16} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`offer-${id}`}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <motion.div
                variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } } }}
                initial="hidden"
                animate="show"
                className="mt-5 rounded-2xl bg-white/95 text-left p-5 shadow-inner"
              >
                <motion.span variants={reveal} className={`block section-label mb-2 ${th.accent}`}>{tag}</motion.span>
                <motion.p variants={reveal} className="font-sans text-sm md:text-[15px] text-clay-400 leading-relaxed mb-2">{desc}</motion.p>
                <motion.p variants={reveal} className="font-sans text-sm text-clay-500 font-medium leading-relaxed mb-4">{note}</motion.p>
                <div className="flex items-center justify-between gap-4">
                  <motion.span
                    variants={{ hidden: { opacity: 0, scale: 0.4, rotate: -8 }, show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 14 } } }}
                    className="font-serif text-4xl text-clay-500 leading-none"
                  >
                    {price}
                  </motion.span>
                  <motion.a
                    variants={reveal}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center flex-1 px-6 py-3.5 rounded-full text-cream font-sans text-xs tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${th.payBtn}`}
                  >
                    {cta}
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openOffer, setOpenOffer] = useState<'energy' | 'therapy' | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll-based parallax for hero elements
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const mandalaY = useTransform(scrollY, [0, 600], [0, 120]);
  const mandalaScale = useTransform(scrollY, [0, 600], [1, 1.4]);

  const springX = useSpring(mouseX, { stiffness: 35, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 35, damping: 18 });
  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" ref={sectionRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(196,113,74,0.09) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(138,158,122,0.11) 0%, transparent 60%), linear-gradient(160deg, #FAF5EC 0%, #F5EDD6 40%, #EDE0C4 100%)',
          }}
        />
        <FloatingOrb delay={0} size={380} x="8%" y="10%" color="radial-gradient(circle, rgba(196,113,74,0.2), transparent)" />
        <FloatingOrb delay={3} size={300} x="62%" y="52%" color="radial-gradient(circle, rgba(138,158,122,0.2), transparent)" />
        <FloatingOrb delay={5} size={220} x="78%" y="8%" color="radial-gradient(circle, rgba(201,168,76,0.18), transparent)" />
        <FloatingOrb delay={2} size={200} x="2%" y="65%" color="radial-gradient(circle, rgba(138,158,122,0.15), transparent)" />
      </div>

      {/* 3D Mandala — parallax scroll out */}
      <motion.div
        style={{ y: mandalaY, scale: mandalaScale, opacity: heroOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <motion.div
          className="w-[700px] h-[700px] md:w-[900px] md:h-[900px] text-terracotta-200 opacity-[0.10]"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            rotateZ: [0, 360],
            rotateY: [0, 12, 0, -12, 0],
          }}
          transition={{
            rotateZ: { duration: 120, repeat: Infinity, ease: 'linear' },
            rotateY: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Mandala3D />
        </motion.div>
      </motion.div>

      {/* Second mandala layer — counter-rotate for depth */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 600], [0, 60]) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <motion.div
          className="w-[500px] h-[500px] md:w-[680px] md:h-[680px] text-gold-300 opacity-[0.07]"
          animate={{ rotateZ: [0, -360] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <Mandala3D />
        </motion.div>
      </motion.div>

      {/* Flower of Life — background, centered, behind text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: useTransform(scrollY, [0, 600], [0, 40]) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
      >
        <motion.div
          className="w-[560px] h-[560px] md:w-[700px] md:h-[700px] lg:w-[820px] lg:h-[820px] text-terracotta-300 opacity-[0.22]"
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 24px rgba(196,113,74,0.5))' }}
        >
          <FlowerOfLife />
        </motion.div>
      </motion.div>

      <div className="relative z-10 w-full pb-32">
      {/* Main content — parallax scroll up + 3D mouse tilt */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, rotateX, rotateY, transformPerspective: 1400 }}
        className="text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={item} className="flex items-center justify-center gap-3 mb-5">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent to-terracotta-300"
              initial={{ width: 0 }}
              animate={{ width: 56 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />
            <motion.span
              className="section-label flex items-center gap-1.5"
              animate={{ opacity: [1, 0.65, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.span animate={{ rotate: [0, 18, -18, 0], scale: [1, 1.2, 1] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
                <Sparkles size={10} />
              </motion.span>
              {t('hero.badge')}
              <motion.span animate={{ rotate: [0, -18, 18, 0], scale: [1, 1.2, 1] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}>
                <Sparkles size={10} />
              </motion.span>
            </motion.span>
            <motion.div
              className="h-px bg-gradient-to-l from-transparent to-terracotta-300"
              initial={{ width: 0 }}
              animate={{ width: 56 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-serif text-6xl md:text-7xl lg:text-8xl [@media(max-height:820px)]:lg:text-7xl text-clay-500 leading-[1.05] mb-4"
          >
            <motion.span
              className="inline-block"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {t('hero.h1.1')}
            </motion.span>{' '}
            <motion.em
              className="text-gradient not-italic inline-block"
              style={{ backgroundSize: '200% 200%' }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                y: [0, -6, 0],
              }}
              transition={{
                backgroundPosition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 },
              }}
            >
              {t('hero.h1.accent')}
            </motion.em>
            <br />
            <motion.span
              className="text-4xl md:text-5xl lg:text-6xl [@media(max-height:820px)]:lg:text-5xl font-light text-clay-400 inline-block"
              initial={{ opacity: 0, letterSpacing: '0.25em' }}
              animate={{ opacity: 1, letterSpacing: '0.02em' }}
              transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('hero.h1.2')}
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            className="font-sans text-base md:text-lg text-clay-400 font-light leading-relaxed max-w-2xl mx-auto mb-3"
          >
            {t('hero.description')}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Ofertas principales — fuera del bloque que se desvanece al hacer scroll */}
      <div className="px-6 max-w-4xl mx-auto mt-6">
        <div className="grid md:grid-cols-2 gap-5 items-start">
          <Offer
            id="energy"
            icon={Wind}
            theme="terra"
            tag={t('hero.offer.energy.tag')}
            title={t('hero.offer.energy.title')}
            desc={t('hero.offer.energy.desc')}
            note={t('hero.offer.energy.note')}
            price="$85"
            more={t('hero.offer.more')}
            less={t('hero.offer.less')}
            cta={t('hero.offer.energy.cta')}
            href={KARNAK_PERSONAL_PAY_URL}
            open={openOffer === 'energy'}
            onToggle={() => setOpenOffer(openOffer === 'energy' ? null : 'energy')}
            delay={1.1}
            floatDuration={5.5}
          />
          <Offer
            id="therapy"
            icon={Video}
            theme="sage"
            tag={t('hero.offer.therapy.tag')}
            title={t('hero.offer.therapy.title')}
            desc={t('hero.offer.therapy.desc')}
            note={t('hero.offer.therapy.note')}
            price="$25"
            more={t('hero.offer.more')}
            less={t('hero.offer.less')}
            cta={THERAPEUTIC_DIAGNOSIS_PAY_URL ? t('hero.offer.therapy.cta') : t('hero.offer.therapy.cta.whatsapp')}
            href={THERAPEUTIC_DIAGNOSIS_PAY_URL || `${BUSINESS.whatsapp}?text=${encodeURIComponent(t('hero.offer.therapy.wa'))}`}
            open={openOffer === 'therapy'}
            onToggle={() => setOpenOffer(openOffer === 'therapy' ? null : 'therapy')}
            delay={1.3}
            floatDuration={6.5}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="mt-5 text-center"
        >
          <button
            onClick={() => scrollTo('#services')}
            className="font-sans text-xs tracking-[0.22em] uppercase text-terracotta-400 hover:text-terracotta-300 underline underline-offset-8 decoration-terracotta-200 transition-colors"
          >
            {t('hero.cta.secondary')}
          </button>
        </motion.div>
      </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        style={{ opacity: heroOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group z-10"
        aria-label="Scroll down"
      >
        <motion.span
          className="text-[10px] tracking-[0.35em] uppercase font-sans text-clay-400 group-hover:text-terracotta-300 transition-colors duration-300"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t('hero.scroll')}
        </motion.span>
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-terracotta-300 to-transparent group-hover:via-terracotta-400 transition-colors duration-300" />
          <div className="w-5 h-5 rounded-full border-2 border-terracotta-300 group-hover:border-terracotta-400 flex items-center justify-center transition-colors duration-300">
            <ArrowDown size={10} className="text-terracotta-300 group-hover:text-terracotta-400 transition-colors duration-300" />
          </div>
        </motion.div>
      </motion.button>
    </section>
  );
}
