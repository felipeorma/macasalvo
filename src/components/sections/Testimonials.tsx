import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const testimonialData = [
  { id: 1, service: 'Access Bars', initials: 'VM', color: 'from-terracotta-100 to-rose-100', nameKey: 'testimonials.t1.name', locationKey: 'testimonials.t1.location', quoteKey: 'testimonials.t1.quote' },
  { id: 2, service: 'Sound Bath', initials: 'LP', color: 'from-sage-100 to-sand-100', nameKey: 'testimonials.t2.name', locationKey: 'testimonials.t2.location', quoteKey: 'testimonials.t2.quote' },
  { id: 3, service: "Women's Circle", initials: 'DR', color: 'from-rose-100 to-terracotta-100', nameKey: 'testimonials.t3.name', locationKey: 'testimonials.t3.location', quoteKey: 'testimonials.t3.quote' },
  { id: 4, service: 'Karnak Pendulum', initials: 'CS', color: 'from-gold-100 to-sand-200', nameKey: 'testimonials.t4.name', locationKey: 'testimonials.t4.location', quoteKey: 'testimonials.t4.quote' },
  { id: 5, service: 'Sacred Geometry', initials: 'FT', color: 'from-sand-100 to-beige-200', nameKey: 'testimonials.t5.name', locationKey: 'testimonials.t5.location', quoteKey: 'testimonials.t5.quote' },
];

function StarRating({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: delay + i * 0.06, duration: 0.4, type: 'spring', stiffness: 300 }}
        >
          <Star size={13} className="text-terracotta-300 fill-terracotta-300" />
        </motion.div>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + testimonialData.length) % testimonialData.length);
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % testimonialData.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setTouchStart(null);
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonialData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused]);

  const item = testimonialData[index];

  return (
    <section className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(160deg, #EDE0C4 0%, #EDD8D4 50%, #F5EDD6 100%)' }}
      />

      {/* Decorative background circles */}
      <motion.div
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,113,74,0.3), transparent)' }}
        animate={{ scale: [1, 1.1, 1], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 top-1/3 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(138,158,122,0.3), transparent)' }}
        animate={{ scale: [1, 1.08, 1], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label">{t('testimonials.label')}</span>
          <h2 className="font-serif text-5xl md:text-6xl text-clay-500 mt-4 mb-4">
            {t('testimonials.title.1')}{' '}
            <em className="text-gradient not-italic">{t('testimonials.title.2')}</em>
          </h2>
          <div className="section-divider mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="glass-card p-8 md:p-14 shadow-xl shadow-sand-300/30 overflow-hidden min-h-[300px] flex flex-col justify-between relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Big quote background decoration */}
            <motion.div
              className="absolute top-6 right-8 text-terracotta-100 pointer-events-none select-none font-serif text-[10rem] leading-none opacity-30"
              animate={{ rotate: [0, 3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              "
            </motion.div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={item.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: direction * -60, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <Quote size={28} className="text-terracotta-200 flex-shrink-0" />
                  <StarRating delay={0.1} />
                </div>
                <p className="font-serif text-xl md:text-2xl text-clay-500 leading-relaxed italic">
                  "{t(item.quoteKey)}"
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <motion.div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-sm`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <span className="font-serif text-sm text-clay-500">{item.initials}</span>
                  </motion.div>
                  <div>
                    <div className="font-sans font-medium text-sm text-clay-500">{t(item.nameKey)}</div>
                    <div className="text-[11px] text-terracotta-300 font-sans tracking-widest uppercase">
                      {item.service} · {t(item.locationKey)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2 items-center">
              {testimonialData.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  animate={{ width: i === index ? 24 : 6, opacity: i === index ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                  className={`h-1.5 rounded-full ${i === index ? 'bg-terracotta-300' : 'bg-sand-300'}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.12, x: -2 }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-full glass-card border border-sand-300 hover:border-terracotta-200 flex items-center justify-center text-clay-400 hover:text-terracotta-300 transition-colors"
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.12, x: 2 }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-full glass-card border border-sand-300 hover:border-terracotta-200 flex items-center justify-center text-clay-400 hover:text-terracotta-300 transition-colors"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
