import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, MessageCircle, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../context/LanguageContext';
import { BUSINESS } from '../seo.config';
import { SERVICES_CONTENT, servicePath, type ServiceContent } from '../services.data';

export default function ServicePage({ service }: { service: ServiceContent }) {
  const { lang } = useLang();
  const home = lang === 'en' ? '/en/' : '/';

  // Scroll to top on mount (in case of in-app navigation).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const es = lang === 'es';
  const name = es ? service.nameEs : service.nameEn;
  const price = es ? service.priceEs : service.priceEn;
  const modality = es ? service.modalityEs : service.modalityEn;
  const intro = es ? service.introEs : service.introEn;
  const benefits = es ? service.benefitsEs : service.benefitsEn;
  const expect = es ? service.expectEs : service.expectEn;
  const Icon = service.icon;

  const L = es
    ? {
        home: 'Inicio',
        services: 'Servicios',
        benefits: 'Beneficios',
        expect: 'Qué esperar',
        book: 'Reservar esta sesión',
        whatsapp: 'Escríbeme por WhatsApp',
        trust: 'Con Maca Salvo, terapeuta holística certificada en Calgary',
        other: 'Otras terapias',
        back: 'Ver todos los servicios',
      }
    : {
        home: 'Home',
        services: 'Services',
        benefits: 'Benefits',
        expect: 'What to expect',
        book: 'Book this session',
        whatsapp: 'Message me on WhatsApp',
        trust: 'With Maca Salvo, certified holistic therapist in Calgary',
        other: 'Other therapies',
        back: 'See all services',
      };

  const others = SERVICES_CONTENT.filter((s) => s.slugEs !== service.slugEs).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{ background: 'linear-gradient(180deg, #FAF5EC 0%, #F5EDD6 100%)' }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="mb-8 text-[11px] tracking-widest uppercase font-sans text-clay-400">
              <a href={home} className="hover:text-terracotta-300 transition-colors">{L.home}</a>
              <span className="mx-2">/</span>
              <a href={`${home}#services`} className="hover:text-terracotta-300 transition-colors">{L.services}</a>
              <span className="mx-2">/</span>
              <span className="text-clay-500">{name}</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                <Icon size={26} className={service.accent} />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-clay-500 leading-tight mb-5">
                {name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] tracking-widest uppercase font-sans border ${service.border} ${service.accent}`}>
                  <Globe size={11} />
                  {modality}
                </span>
                <span className={`font-sans text-sm font-semibold ${service.accent}`}>{price}</span>
              </div>
              <p className="font-sans font-light text-clay-400 text-lg leading-relaxed max-w-2xl">
                {intro}
              </p>
              <p className="font-sans text-sm text-clay-400/80 mt-4 italic">{L.trust}</p>

              <div className="flex flex-wrap gap-3 mt-8">
                <a href={`${home}#booking`} className="btn-primary text-sm py-3 px-6 font-bold inline-flex items-center gap-2">
                  {L.book}
                  <ArrowRight size={15} />
                </a>
                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm py-3 px-6 rounded-full border border-sage-300 text-sage-600 font-sans font-semibold hover:bg-sage-100 transition-colors"
                >
                  <MessageCircle size={15} />
                  {L.whatsapp}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="relative py-16 bg-cream">
          <div className="max-w-4xl mx-auto px-6">
            <span className="section-label">{L.benefits}</span>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`glass-card border ${service.border} p-5 flex items-start gap-3`}
                >
                  <span className={`mt-0.5 w-6 h-6 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
                    <Check size={13} className={service.accent} />
                  </span>
                  <span className="font-sans text-clay-500 leading-relaxed">{b}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="relative py-16">
          <div className="max-w-3xl mx-auto px-6">
            <span className="section-label">{L.expect}</span>
            <p className="font-sans font-light text-clay-400 text-lg leading-relaxed mt-6">{expect}</p>
            <div className="mt-10">
              <a href={`${home}#booking`} className="btn-primary text-sm py-3 px-6 font-bold inline-flex items-center gap-2">
                {L.book}
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="relative py-16 bg-cream">
          <div className="max-w-5xl mx-auto px-6">
            <span className="section-label">{L.other}</span>
            <div className="grid md:grid-cols-3 gap-5 mt-8">
              {others.map((s) => {
                const OIcon = s.icon;
                return (
                  <a
                    key={s.slugEs}
                    href={servicePath(s, lang)}
                    className={`glass-card border ${s.border} p-6 group hover:shadow-xl hover:shadow-sand-300/40 transition-shadow`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                      <OIcon size={18} className={s.accent} />
                    </div>
                    <h3 className="font-serif text-lg text-clay-500 mb-2">{es ? s.nameEs : s.nameEn}</h3>
                    <span className={`inline-flex items-center gap-1 text-xs tracking-widest uppercase font-sans ${s.accent} group-hover:gap-2 transition-all`}>
                      {es ? 'Ver más' : 'Learn more'}
                      <ArrowRight size={12} />
                    </span>
                  </a>
                );
              })}
            </div>
            <div className="mt-10">
              <a href={`${home}#services`} className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-clay-500 hover:text-terracotta-300 transition-colors">
                <ArrowLeft size={15} />
                {L.back}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
