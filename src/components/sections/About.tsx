import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Leaf, Star, Sun, Compass, Flower, Sparkles, Waves } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const valueKeys = [
  { icon: Heart, labelKey: 'about.value1.label', descKey: 'about.value1.desc' },
  { icon: Leaf, labelKey: 'about.value2.label', descKey: 'about.value2.desc' },
  { icon: Star, labelKey: 'about.value3.label', descKey: 'about.value3.desc' },
  { icon: Sun, labelKey: 'about.value4.label', descKey: 'about.value4.desc' },
];

const journeyStepIcons = [Compass, Flower, Sparkles, Heart, Waves, Star];

// 3D tilt card
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-50, 50], [5, -5]);
  const rotY = useTransform(x, [-50, 50], [-5, 5]);
  const springRotX = useSpring(rotX, { stiffness: 300, damping: 30 });
  const springRotY = useSpring(rotY, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: springRotX, rotateY: springRotY, transformPerspective: 800 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLang();

  // Parallax for photo
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.02, 0.96]);

  const journeyParagraphs = t('about.journey.text').split('\n\n');
  const philosophyParagraphs = t('about.philosophy.text').split('\n\n');

  return (
    <section id="about" ref={sectionRef} className="relative py-28 lg:py-36 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #FAF5EC 0%, #F5EDD6 30%, #EDE0C4 70%, #F5EDD6 100%)' }}
      />

      {/* Decorative background ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-terracotta-100/30 pointer-events-none"
        animate={{ rotate: 360, scale: [1, 1.02, 1] }}
        transition={{ rotate: { duration: 90, repeat: Infinity, ease: 'linear' }, scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-sand-200/40 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-clay-500 mb-6">
            {t('about.meet')}{' '}
            <motion.em
              className="text-gradient not-italic inline-block"
              style={{ backgroundSize: '200% 200%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              Maca Salvo
            </motion.em>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Photo + Journey */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Photo with parallax */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.1 }}
            className="relative lg:sticky lg:top-32"
          >
            <div className="relative mx-auto max-w-lg">
              {/* Orbiting ring decoration */}
              <motion.div
                className="absolute -inset-8 rounded-[50px] border border-terracotta-100/50 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-12 rounded-[60px] border border-sand-200/30 pointer-events-none"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              />

              <motion.div style={{ y: photoY, scale: photoScale }}>
                <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-terracotta-100 via-sand-200 to-sage-100 opacity-60 blur-sm" />
                <div className="relative glass-card p-2 shadow-xl shadow-sand-300/30">
                  <div className="w-full aspect-[4/5] rounded-[32px] overflow-hidden">
                    <motion.img
                      src={`${import.meta.env.BASE_URL}foto_perfil_cuencos_.JPG`}
                      alt="Maca Salvo, terapeuta holística"
                      className="w-full h-full object-cover object-[center_20%]"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <span className="section-label">{t('about.journey.label')}</span>
            <h3 className="font-serif text-3xl text-clay-500 mt-3 mb-8">{t('about.journey.title')}</h3>

            <div className="relative">
              {/* Animated vertical line */}
              <motion.div
                className="absolute left-5 top-2 w-px bg-gradient-to-b from-terracotta-200 via-sand-300 to-transparent"
                initial={{ height: 0 }}
                animate={isInView ? { height: '94%' } : {}}
                transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="space-y-6">
                {journeyParagraphs.map((para, i) => {
                  const Icon = journeyStepIcons[i % journeyStepIcons.length];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -24 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="flex gap-5 pl-1 group"
                    >
                      <motion.div
                        className="relative flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-terracotta-100 to-sand-200 border border-terracotta-200/60 flex items-center justify-center shadow-sm z-10"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <Icon size={15} className="text-terracotta-300" />
                      </motion.div>
                      <div className="pt-2 pb-2">
                        <p className="text-clay-400 font-sans font-light leading-relaxed text-sm group-hover:text-clay-500 transition-colors duration-300">
                          {para}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delay: 0.25 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <span className="section-label">{t('about.philosophy.label')}</span>
            <h3 className="font-serif text-3xl md:text-4xl text-clay-500 mt-3">{t('about.philosophy.title')}</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {philosophyParagraphs.map((para, i) => {
              const isAccent = i === 0;
              return (
                <TiltCard
                  key={i}
                  className={`relative glass-card p-6 rounded-3xl overflow-hidden cursor-default ${
                    isAccent ? 'md:col-span-2 lg:col-span-1 border border-terracotta-200/50' : ''
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.35 + i * 0.09, duration: 0.65 }}
                    className="h-full"
                  >
                    {/* Shimmer on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-3xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-terracotta-200 to-transparent rounded-l-3xl" />
                    {isAccent && (
                      <motion.div
                        className="w-8 h-8 rounded-full bg-terracotta-100 flex items-center justify-center mb-4"
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Sparkles size={14} className="text-terracotta-300" />
                      </motion.div>
                    )}
                    <p className={`font-sans font-light leading-relaxed ${isAccent ? 'text-clay-500 text-base italic font-serif' : 'text-clay-400 text-sm'}`}>
                      {isAccent ? `"${para}"` : para}
                    </p>
                  </motion.div>
                </TiltCard>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center mb-20"
        >
          <motion.button
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="absolute inset-0 bg-terracotta-50/60"
              initial={{ x: '-100%', skewX: -15 }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.4 }}
            />
            {t('about.explore')}
          </motion.button>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {valueKeys.map((v, i) => (
            <motion.div
              key={v.labelKey}
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
              style={{ transformPerspective: 600 }}
              className="glass-card p-6 text-center group hover:shadow-lg hover:shadow-sand-300/40 transition-shadow duration-300 cursor-default"
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-terracotta-100 to-sand-200 flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              >
                <v.icon size={20} className="text-terracotta-300" />
              </motion.div>
              <h4 className="font-serif text-lg text-clay-500 mb-2">{t(v.labelKey)}</h4>
              <p className="text-xs font-sans font-light text-clay-400 leading-relaxed">{t(v.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
