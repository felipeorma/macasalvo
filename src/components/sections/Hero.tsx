import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { useRef, useEffect } from 'react';

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

export default function Hero() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
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

      {/* Main content — parallax scroll up + 3D mouse tilt */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, rotateX, rotateY, transformPerspective: 1400 }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={item} className="flex items-center justify-center gap-3 mb-8">
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
            className="font-serif text-6xl md:text-7xl lg:text-8xl text-clay-500 leading-[1.05] mb-6"
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
              className="text-4xl md:text-5xl lg:text-6xl font-light text-clay-400 inline-block"
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

          {/* CTA */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => scrollTo('#services')}
              className="relative overflow-hidden px-10 py-4 rounded-full font-sans text-sm tracking-[0.18em] uppercase font-medium border-2 border-terracotta-300 text-terracotta-400 bg-white/60 backdrop-blur-sm shadow-lg shadow-terracotta-200/40 hover:text-cream transition-colors duration-300"
              whileHover={{ scale: 1.06, boxShadow: '0 12px 40px rgba(196,113,74,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-terracotta-300 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative z-10">{t('hero.cta.secondary')}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

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
