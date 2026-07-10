import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, CheckCircle } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

type Service = 'access-bars' | 'sound-bath' | 'karnak-personal' | 'space-clearing' | 'womens-circle' | 'sacred-geometry';

// Q1: concern → which therapies address it (weight 2)
const concernScores: Record<string, Partial<Record<Service, number>>> = {
  anxiety:      { 'access-bars': 3, 'sound-bath': 1 },
  depression:   { 'sacred-geometry': 2, 'access-bars': 2, 'sound-bath': 1 },
  relationships:{ 'womens-circle': 3, 'access-bars': 1 },
  transitions:  { 'womens-circle': 2, 'sacred-geometry': 2, 'access-bars': 1 },
  grief:        { 'sound-bath': 3, 'womens-circle': 2 },
  stress:       { 'access-bars': 2, 'sound-bath': 2 },
  selfesteem:   { 'sacred-geometry': 3, 'access-bars': 1 },
  trauma:       { 'access-bars': 3, 'sound-bath': 1 },
  spiritual:    { 'sacred-geometry': 4, 'karnak-personal': 1 },
  home:         { 'space-clearing': 5 },
};

// Q2: how they experience it in their body (weight 1 — tiebreaker)
const bodyScores: Record<string, Partial<Record<Service, number>>> = {
  physical:  { 'access-bars': 2, 'sound-bath': 1 },
  emotional: { 'sound-bath': 2, 'womens-circle': 1 },
  mental:    { 'access-bars': 2, 'sacred-geometry': 1 },
  energetic: { 'karnak-personal': 2, 'sacred-geometry': 1 },
};

// Q3: preferred support style — highest weight (3), most decisive signal
const supportScores: Record<string, Partial<Record<Service, number>>> = {
  hands_on: { 'access-bars': 6 },
  sound:    { 'sound-bath': 6 },
  group:    { 'womens-circle': 6 },
  space:    { 'space-clearing': 4, 'sacred-geometry': 3 },
};

const q1Options = [
  'anxiety', 'depression', 'relationships', 'transitions',
  'grief', 'stress', 'selfesteem', 'trauma', 'spiritual', 'home',
];
const q2Options = ['physical', 'emotional', 'mental', 'energetic'];
const q3Options = ['hands_on', 'sound', 'group', 'space'];

const ALL_SERVICES: Service[] = ['access-bars', 'sound-bath', 'karnak-personal', 'space-clearing', 'womens-circle', 'sacred-geometry'];

const fadeSlide = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3 } },
};

function computeResult(concerns: string[], body: string, support: string): Service {
  const scores: Record<Service, number> = {
    'access-bars': 0, 'sound-bath': 0, 'karnak-personal': 0, 'space-clearing': 0, 'womens-circle': 0, 'sacred-geometry': 0,
  };

  for (const concern of concerns) {
    const w = concernScores[concern] ?? {};
    for (const svc of ALL_SERVICES) {
      scores[svc] += w[svc] ?? 0;
    }
  }

  const bw = bodyScores[body] ?? {};
  for (const svc of ALL_SERVICES) scores[svc] += bw[svc] ?? 0;

  const sw = supportScores[support] ?? {};
  for (const svc of ALL_SERVICES) scores[svc] += sw[svc] ?? 0;

  return ALL_SERVICES.reduce((best, svc) => scores[svc] > scores[best] ? svc : best, ALL_SERVICES[0]);
}

export default function Assessment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLang();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [bodyAnswer, setBodyAnswer] = useState('');
  const [supportAnswer, setSupportAnswer] = useState('');
  const [done, setDone] = useState(false);

  const totalSteps = 3;

  const toggleConcern = (id: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const canContinue = () => {
    if (currentStep === 0) return selectedConcerns.length > 0;
    if (currentStep === 1) return bodyAnswer !== '';
    return supportAnswer !== '';
  };

  const next = () => {
    if (!canContinue()) return;
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setDone(true);
    }
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setSelectedConcerns([]);
    setBodyAnswer('');
    setSupportAnswer('');
    setDone(false);
  };

  const resultService: Service | null = done
    ? computeResult(selectedConcerns, bodyAnswer, supportAnswer)
    : null;

  const questions = [t('assessment.q1'), t('assessment.q2'), t('assessment.q3')];

  return (
    <section id="assessment" className="relative py-28 lg:py-36 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(160deg, #EDE0C4 0%, #F5EDD6 30%, #EDD8D4 70%, #F5EDD6 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label">{t('assessment.label')}</span>
          <h2 className="font-serif text-5xl md:text-6xl text-clay-500 mt-4 mb-4">
            {t('assessment.title').split('\n')[0]}{' '}
            <em className="text-gradient not-italic">{t('assessment.title').split('\n')[1]}</em>
          </h2>
          <p className="font-sans font-light text-clay-400 max-w-lg mx-auto leading-relaxed">
            {t('assessment.subtitle')}
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12 shadow-xl shadow-sand-300/30">
            {!done && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-sans text-clay-400 tracking-widest uppercase">
                    {t('assessment.step')} {currentStep + 1} {t('assessment.of')} {totalSteps}
                  </span>
                  <span className="text-xs font-sans text-terracotta-300">
                    {Math.round((currentStep / totalSteps) * 100)}{t('assessment.complete')}
                  </span>
                </div>
                <div className="w-full h-1 bg-sand-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-terracotta-300 to-rose-300 rounded-full"
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {done && resultService ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-terracotta-200 to-rose-200 flex items-center justify-center mx-auto mb-6"
                  >
                    <Sparkles className="text-terracotta-400" size={28} />
                  </motion.div>
                  <span className="section-label">{t('assessment.result.label')}</span>
                  <h3 className="font-serif text-4xl text-clay-500 mt-4 mb-3">
                    {t(`assessment.rec.${resultService}.name`)}
                  </h3>
                  <p className="text-clay-400 font-sans font-light leading-relaxed max-w-md mx-auto mb-10">
                    {t(`assessment.rec.${resultService}.desc`)}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                      className="btn-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('assessment.book')}
                    </motion.button>
                    <motion.button
                      onClick={reset}
                      className="btn-secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('assessment.restart')}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  variants={fadeSlide}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h3 className="font-serif text-2xl md:text-3xl text-clay-500 mb-8 leading-snug">
                    {questions[currentStep]}
                  </h3>

                  {currentStep === 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {q1Options.map((opt) => {
                        const active = selectedConcerns.includes(opt);
                        return (
                          <motion.button
                            key={opt}
                            onClick={() => toggleConcern(opt)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className={`relative p-4 rounded-2xl border text-left transition-all duration-300 ${
                              active
                                ? 'border-terracotta-300 bg-terracotta-100/60 shadow-md shadow-terracotta-100'
                                : 'border-sand-300 bg-white/30 hover:border-terracotta-200 hover:bg-terracotta-100/30'
                            }`}
                          >
                            {active && (
                              <CheckCircle size={14} className="absolute top-3 right-3 text-terracotta-300" />
                            )}
                            <div className="font-serif text-base text-clay-500 mb-1">
                              {t(`assessment.q1.${opt}.label`)}
                            </div>
                            <div className="text-[11px] font-sans text-clay-400 leading-snug">
                              {t(`assessment.q1.${opt}.desc`)}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  ) : currentStep === 1 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {q2Options.map((opt) => {
                        const active = bodyAnswer === opt;
                        return (
                          <motion.button
                            key={opt}
                            onClick={() => setBodyAnswer(opt)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
                              active
                                ? 'border-terracotta-300 bg-terracotta-100/60 shadow-md shadow-terracotta-100'
                                : 'border-sand-300 bg-white/30 hover:border-terracotta-200 hover:bg-terracotta-100/30'
                            }`}
                          >
                            {active && (
                              <CheckCircle size={14} className="absolute top-3 right-3 text-terracotta-300" />
                            )}
                            <div className="font-serif text-base text-clay-500 mb-1">
                              {t(`assessment.q2.${opt}.label`)}
                            </div>
                            <div className="text-xs font-sans text-clay-400 leading-snug">
                              {t(`assessment.q2.${opt}.desc`)}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {q3Options.map((opt) => {
                        const active = supportAnswer === opt;
                        return (
                          <motion.button
                            key={opt}
                            onClick={() => setSupportAnswer(opt)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
                              active
                                ? 'border-terracotta-300 bg-terracotta-100/60 shadow-md shadow-terracotta-100'
                                : 'border-sand-300 bg-white/30 hover:border-terracotta-200 hover:bg-terracotta-100/30'
                            }`}
                          >
                            {active && (
                              <CheckCircle size={14} className="absolute top-3 right-3 text-terracotta-300" />
                            )}
                            <div className="font-serif text-base text-clay-500 mb-1">
                              {t(`assessment.q3.${opt}.label`)}
                            </div>
                            <div className="text-xs font-sans text-clay-400 leading-snug">
                              {t(`assessment.q3.${opt}.desc`)}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-10">
                    {currentStep > 0 ? (
                      <button
                        onClick={back}
                        className="flex items-center gap-2 text-xs tracking-widest uppercase font-sans text-clay-400 hover:text-terracotta-300 transition-colors"
                      >
                        <ChevronLeft size={14} /> {t('assessment.back')}
                      </button>
                    ) : (
                      <div />
                    )}
                    <motion.button
                      onClick={next}
                      disabled={!canContinue()}
                      className={`btn-primary ${!canContinue() ? 'opacity-40 cursor-not-allowed' : ''}`}
                      whileHover={canContinue() ? { scale: 1.02 } : {}}
                      whileTap={canContinue() ? { scale: 0.98 } : {}}
                    >
                      {currentStep === totalSteps - 1 ? t('assessment.see') : t('assessment.continue')}
                      <ChevronRight size={14} />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
