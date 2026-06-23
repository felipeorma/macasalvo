import { motion } from 'framer-motion';
import { Instagram, MessageCircle, ArrowUp, Heart } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const SacredLine = () => (
  <svg viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full opacity-20">
    <line x1="0" y1="30" x2="150" y2="30" stroke="#C4714A" strokeWidth="0.5" />
    <circle cx="200" cy="30" r="20" stroke="#C4714A" strokeWidth="0.5" />
    <circle cx="200" cy="30" r="10" stroke="#C4714A" strokeWidth="0.5" />
    <circle cx="200" cy="30" r="3" fill="#C4714A" />
    <line x1="250" y1="30" x2="400" y2="30" stroke="#C4714A" strokeWidth="0.5" />
    <line x1="180" y1="10" x2="220" y2="50" stroke="#C4714A" strokeWidth="0.5" />
    <line x1="220" y1="10" x2="180" y2="50" stroke="#C4714A" strokeWidth="0.5" />
  </svg>
);

export default function Footer() {
  const { t } = useLang();
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.assessment', href: '#assessment' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.instagram', href: '#instagram' },
    { key: 'nav.booking', href: '#booking' },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="contact" className="relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(160deg, #EDE0C4 0%, #D9A898 40%, #C4714A 100%)',
        }}
      />
      <div className="absolute inset-0 bg-clay-500/80 z-0" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="mb-6">
                <div className="font-serif text-3xl text-cream tracking-wide mb-1">Maca Salvo</div>
                <div className="text-[9px] tracking-[0.35em] uppercase font-sans text-terracotta-200">
                  {t('footer.subtitle')}
                </div>
              </div>
              <p className="font-sans font-light text-sm text-beige-300 leading-relaxed mb-6">
                {t('footer.desc')}
              </p>
              <div className="flex gap-3">
                <motion.a
                  href="https://www.instagram.com/expansion_holistiica"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-cream hover:bg-terracotta-300 hover:border-terracotta-300 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </motion.a>
                <motion.a
                  href="https://wa.me/14036790889"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-cream hover:bg-terracotta-300 hover:border-terracotta-300 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={16} />
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-lg text-cream mb-5">{t('footer.nav')}</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-xs tracking-[0.2em] uppercase font-sans text-beige-300 hover:text-cream transition-colors duration-200"
                    >
                      {t(link.key)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg text-cream mb-5">{t('footer.connect')}</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MessageCircle size={14} className="text-terracotta-200 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] tracking-widest uppercase font-sans text-beige-300/60 mb-0.5">{t('footer.connect.whatsapp')}</div>
                    <a href="https://wa.me/14036790889" target="_blank" rel="noopener noreferrer" className="text-sm font-sans text-beige-300 hover:text-cream transition-colors">
                      +1 (403) 679-0889
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Instagram size={14} className="text-terracotta-200 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] tracking-widest uppercase font-sans text-beige-300/60 mb-0.5">{t('footer.connect.instagram')}</div>
                    <a
                      href="https://www.instagram.com/expansion_holistiica"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-sans text-beige-300 hover:text-cream transition-colors"
                    >
                      @expansion_holistiica
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/10">
                <p className="font-serif text-sm text-cream italic leading-relaxed">
                  "{t('footer.quote')}"
                </p>
              </div>
            </div>
          </div>

          <SacredLine />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
            <p className="text-[11px] font-sans text-beige-300/60 text-center md:text-left">
              © {new Date().getFullYear()} Maca Salvo – {t('footer.subtitle')}. {t('footer.rights')}
            </p>
            <p className="text-[11px] font-sans text-beige-300/50 flex items-center gap-1.5">
              {t('footer.made')} <Heart size={10} className="text-terracotta-200 fill-terracotta-200" /> {t('footer.made.for')}
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-[11px] tracking-widest uppercase font-sans text-beige-300/60 hover:text-cream transition-colors"
            >
              {t('footer.back.top')} <ArrowUp size={12} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
