import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const faqKeys = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
  { q: 'faq.q6', a: 'faq.a6' },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #F5EDD6 0%, #FAF5EC 100%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="section-label">{t('faq.label')}</span>
          <h2 className="font-serif text-5xl md:text-6xl text-clay-500 mt-4 mb-4">
            {t('faq.title.1')}{' '}
            <em className="text-gradient not-italic">{t('faq.title.2')}</em>
          </h2>
          <div className="section-divider mt-4" />
        </motion.div>

        <div className="space-y-3">
          {faqKeys.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`glass-card border overflow-hidden transition-all duration-300 ${isOpen ? 'border-terracotta-200 shadow-md shadow-terracotta-100/30' : 'border-sand-200'}`}
              >
                <motion.button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 md:p-6 flex items-start justify-between gap-4 text-left group"
                  whileTap={{ scale: 0.995 }}
                >
                  <span className={`font-serif text-base md:text-lg leading-snug flex-1 transition-colors duration-200 ${isOpen ? 'text-terracotta-400' : 'text-clay-500 group-hover:text-terracotta-400'}`}>
                    {t(faq.q)}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.1 : 1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 ${isOpen ? 'bg-terracotta-100 text-terracotta-300' : 'bg-sand-100 text-clay-400 group-hover:bg-terracotta-50 group-hover:text-terracotta-300'}`}
                  >
                    <Plus size={14} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        exit={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 md:px-6 pb-6"
                      >
                        <div className="h-px bg-gradient-to-r from-terracotta-200/60 to-transparent mb-4" />
                        <p className="font-sans font-light text-sm text-clay-400 leading-relaxed">{t(faq.a)}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 glass-card p-8 border border-terracotta-100 relative overflow-hidden"
        >
          {/* Subtle ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-terracotta-50/40 to-transparent pointer-events-none" />
          <p className="font-serif text-xl text-clay-500 mb-2 relative z-10">{t('faq.cta.title')}</p>
          <p className="font-sans font-light text-sm text-clay-400 mb-6 relative z-10">{t('faq.cta.desc')}</p>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary relative z-10"
            whileHover={{ scale: 1.04, boxShadow: '0 10px 30px rgba(196,113,74,0.3)' }}
            whileTap={{ scale: 0.97 }}
          >
            {t('faq.cta.btn')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
