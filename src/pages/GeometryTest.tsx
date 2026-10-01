import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowLeft, RotateCcw, Share2, MessageCircle, Clock, ListChecks, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlatonicSolid from '../components/PlatonicSolid';
import { useLang } from '../context/LanguageContext';
import { BUSINESS, SITE_URL } from '../seo.config';
import { TEST_PATHS } from '../routes';
import { COPY, QUESTIONS, SOLIDS, SOLID_ORDER, TEST_META, scoreAnswers, type SolidKey } from '../geometryTest.data';

type Stage = 'intro' | 'quiz' | 'result';

const TOTAL = QUESTIONS.length;
const CHIP_ICONS = [ListChecks, Clock, Sparkles];

export default function GeometryTest() {
  const { lang } = useLang();
  const es = lang === 'es';
  const copy = COPY[lang];
  const reduced = useReducedMotion();

  const [stage, setStage] = useState<Stage>('intro');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SolidKey[]>([]);
  const [picked, setPicked] = useState<number | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Foco en el título de cada pregunta y del resultado (lectores de pantalla y teclado).
  // Se hace con un ref de callback para enfocar el título NUEVO cuando se monta,
  // no el que todavía se está retirando durante la transición.
  const focusHeading = useCallback((el: HTMLHeadingElement | null) => {
    el?.focus({ preventScroll: true });
  }, []);

  // Al llegar al resultado, volver al inicio de la tarjeta.
  useEffect(() => {
    if (stage === 'result') topRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }, [stage, reduced]);

  const result = useMemo(() => scoreAnswers(answers), [answers]);

  const start = () => {
    setAnswers([]);
    setStep(0);
    setPicked(null);
    setStage('quiz');
  };

  const pick = (index: number) => {
    if (picked !== null) return;
    setPicked(index);
    timer.current = window.setTimeout(() => {
      const next = [...answers, QUESTIONS[step].options[index].solid];
      setAnswers(next);
      setPicked(null);
      if (next.length >= TOTAL) setStage('result');
      else setStep(step + 1);
    }, reduced ? 0 : 280);
  };

  const back = () => {
    window.clearTimeout(timer.current);
    setPicked(null);
    if (step === 0) {
      setAnswers([]);
      setStage('intro');
    } else {
      setAnswers((a) => a.slice(0, -1));
      setStep(step - 1);
    }
  };

  const home = es ? '/' : '/en/';
  const bookingHref = `${home}?servicio=sacred-geometry#booking`;
  const primary = SOLIDS[result.primary][lang];
  const secondary = result.secondary ? SOLIDS[result.secondary][lang] : null;
  const shareUrl = `${SITE_URL}${TEST_PATHS[lang]}`;
  const shareHref = `https://wa.me/?text=${encodeURIComponent(`${copy.shareText(primary.name, primary.element)} ${shareUrl}`)}`;
  const fade = reduced ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return (
    <>
      <Navbar />
      <main className="relative">
        <section className="relative pt-36 pb-24 overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{ background: 'linear-gradient(180deg, #FAF5EC 0%, #F5EDD6 55%, #EDE0C4 100%)' }}
          />
          <div className="relative z-10 max-w-3xl mx-auto px-6" ref={topRef}>
            <nav className="mb-8 text-[11px] tracking-widest uppercase font-sans text-clay-400">
              <a href={home} className="hover:text-terracotta-300 transition-colors">{copy.home}</a>
              <span className="mx-2">/</span>
              <span className="text-clay-500">{copy.crumb}</span>
            </nav>

            <AnimatePresence mode="wait">
              {stage === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={fade}
                >
                  <span className="section-label">{copy.subtitle}</span>
                  <h1 className="font-serif text-4xl md:text-6xl text-clay-500 leading-tight mt-3 mb-6">
                    {TEST_META[lang].h1}
                  </h1>
                  <p className="font-sans font-light text-clay-400 text-lg leading-relaxed max-w-2xl">{copy.lead}</p>

                  <ul className="flex flex-wrap gap-3 mt-7">
                    {copy.chips.map((chip, i) => {
                      const Icon = CHIP_ICONS[i];
                      return (
                        <li
                          key={chip}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] tracking-widest uppercase font-sans border border-sand-300 text-clay-500 bg-white/40"
                        >
                          <Icon size={11} />
                          {chip}
                        </li>
                      );
                    })}
                  </ul>

                  <button type="button" onClick={start} className="btn-primary mt-9 font-bold">
                    {copy.start}
                    <ArrowRight size={15} />
                  </button>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-14" aria-hidden="true">
                    {SOLID_ORDER.map((key, i) => (
                      <PlatonicSolid
                        key={key}
                        solid={key}
                        color={SOLIDS[key].color}
                        label={SOLIDS[key][lang].name}
                        size={110}
                        speed={0.35 + i * 0.09}
                        className="mx-auto w-full max-w-[110px] h-auto"
                      />
                    ))}
                  </div>

                  <div className="mt-20">
                    <span className="section-label">{copy.aboutLabel}</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-clay-500 mt-3 mb-4">{copy.aboutTitle}</h2>
                    <p className="font-sans font-light text-clay-400 leading-relaxed max-w-2xl">{copy.aboutText}</p>
                    <div className="grid sm:grid-cols-2 gap-4 mt-8">
                      {SOLID_ORDER.map((key) => {
                        const s = SOLIDS[key][lang];
                        return (
                          <div key={key} className="glass-card border border-sand-300 p-5 flex gap-4 items-start">
                            <PlatonicSolid
                              solid={key}
                              color={SOLIDS[key].color}
                              label={s.name}
                              size={72}
                              speed={0.3}
                              className="flex-shrink-0 w-[72px] h-[72px]"
                            />
                            <div>
                              <h3 className="font-serif text-xl text-clay-500">
                                {s.name} <span className="text-sm font-sans" style={{ color: SOLIDS[key].color }}>· {s.element}</span>
                              </h3>
                              <p className="font-sans text-[11px] tracking-widest uppercase text-clay-400/80 mt-1">{s.faces}</p>
                              <p className="font-sans font-light text-sm text-clay-400 leading-relaxed mt-2">{s.blurb}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="font-sans text-xs text-clay-400/80 italic mt-8">{copy.disclaimer}</p>
                  </div>
                </motion.div>
              )}

              {stage === 'quiz' && (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={fade}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="section-label" aria-live="polite">{copy.questionOf(step + 1, TOTAL)}</span>
                  </div>
                  <div
                    className="h-1.5 rounded-full bg-sand-200 overflow-hidden mb-8"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={TOTAL}
                    aria-valuenow={step + 1}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-terracotta-200 to-terracotta-300 transition-all duration-500"
                      style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
                    />
                  </div>

                  <h2
                    ref={focusHeading}
                    tabIndex={-1}
                    className="font-serif text-3xl md:text-4xl text-clay-500 leading-snug mb-8 outline-none"
                  >
                    {es ? QUESTIONS[step].es : QUESTIONS[step].en}
                  </h2>

                  <div className="space-y-3" role="group" aria-label={es ? QUESTIONS[step].es : QUESTIONS[step].en}>
                    {QUESTIONS[step].options.map((opt, i) => (
                      <button
                        key={opt.solid}
                        type="button"
                        onClick={() => pick(i)}
                        disabled={picked !== null && picked !== i}
                        className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                          picked === i
                            ? 'border-terracotta-300 bg-terracotta-100/70 shadow-md'
                            : 'border-sand-300 bg-white/40 hover:border-terracotta-200 hover:bg-white/70 disabled:opacity-50'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 w-7 h-7 rounded-full border border-sand-400 text-clay-400 flex items-center justify-center text-xs font-sans flex-shrink-0"
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="font-sans text-clay-500 leading-relaxed">{es ? opt.es : opt.en}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={back}
                    className="mt-8 inline-flex items-center gap-2 text-xs tracking-widest uppercase font-sans font-semibold text-clay-400 hover:text-terracotta-300 transition-colors"
                  >
                    <ArrowLeft size={14} />
                    {copy.back}
                  </button>
                </motion.div>
              )}

              {stage === 'result' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={fade}
                >
                  <div className="text-center">
                    <span className="section-label">{copy.resultLabel}</span>
                    <PlatonicSolid
                      solid={result.primary}
                      color={SOLIDS[result.primary].color}
                      label={primary.name}
                      size={220}
                      speed={0.45}
                      className="mx-auto mt-4 w-[220px] h-[220px]"
                    />
                    <h2
                      ref={focusHeading}
                      tabIndex={-1}
                      className="font-serif text-4xl md:text-5xl text-clay-500 mt-2 outline-none"
                    >
                      {primary.name}
                      <span className="block text-2xl md:text-3xl mt-1" style={{ color: SOLIDS[result.primary].color }}>
                        {primary.element}
                      </span>
                    </h2>
                    <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-clay-400 mt-3">{primary.essence}</p>
                  </div>

                  <div className="glass-card border border-sand-300 p-7 md:p-9 mt-10">
                    <span className="section-label">{copy.messageLabel}</span>
                    <p className="font-sans font-light text-clay-500 text-lg leading-relaxed mt-4">{primary.message}</p>
                    <h3 className="font-serif text-xl text-clay-500 mt-8 mb-2">{copy.balanceLabel}</h3>
                    <p className="font-sans font-light text-clay-400 leading-relaxed">{primary.balance}</p>
                    <div className="mt-8 rounded-2xl p-5" style={{ backgroundColor: `${SOLIDS[result.primary].color}14` }}>
                      <h3 className="font-serif text-xl text-clay-500 mb-2">{copy.invitationLabel}</h3>
                      <p className="font-sans text-clay-500 leading-relaxed">{primary.invitation}</p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="font-serif text-2xl text-clay-500 mb-5">{copy.mapLabel}</h3>
                    <ul className="space-y-3">
                      {result.ranked.map((key) => {
                        const pct = Math.round((result.counts[key] / TOTAL) * 100);
                        const s = SOLIDS[key][lang];
                        return (
                          <li key={key} data-solid-row={key}>
                            <div className="flex justify-between text-sm font-sans text-clay-500 mb-1">
                              <span>
                                {s.name} <span className="text-clay-400">· {s.element}</span>
                              </span>
                              <span className="text-clay-400">{pct}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-sand-200 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${pct}%`, backgroundColor: SOLIDS[key].color }}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {secondary && result.secondary && (
                      <p className="font-sans text-sm text-clay-400 leading-relaxed mt-6">
                        <strong className="font-semibold text-clay-500">
                          {copy.secondLabel}: {secondary.name} · {secondary.element}.
                        </strong>{' '}
                        {secondary.support}
                      </p>
                    )}
                  </div>

                  <div className="mt-12 rounded-3xl p-8 md:p-10 text-center bg-gradient-to-br from-terracotta-100 via-sand-100 to-sage-100 border border-terracotta-200">
                    <h3 className="font-serif text-3xl md:text-4xl text-clay-500 leading-tight">{copy.ctaTitle}</h3>
                    <p className="font-sans font-light text-clay-500 leading-relaxed max-w-xl mx-auto mt-4">{copy.ctaText}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">
                      <a href={bookingHref} className="btn-primary font-bold justify-center" data-cta="book">
                        {copy.ctaButton}
                        <ArrowRight size={15} />
                      </a>
                      <a
                        href={BUSINESS.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm py-3 px-6 rounded-full border border-sage-300 text-sage-600 font-sans font-semibold hover:bg-white/60 transition-colors"
                      >
                        <MessageCircle size={15} />
                        {copy.ctaWhatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                    <button
                      type="button"
                      onClick={start}
                      className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-sans font-semibold text-clay-500 hover:text-terracotta-300 transition-colors"
                    >
                      <RotateCcw size={14} />
                      {copy.retake}
                    </button>
                    <a
                      href={shareHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-sans font-semibold text-clay-500 hover:text-terracotta-300 transition-colors"
                    >
                      <Share2 size={14} />
                      {copy.share}
                    </a>
                  </div>
                  <p className="font-sans text-xs text-clay-400/80 italic text-center mt-8 max-w-xl mx-auto">{copy.disclaimer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
