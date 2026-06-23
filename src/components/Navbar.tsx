import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

function LanguageSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 bg-sand-200/60 rounded-full px-1.5 py-1 border border-sand-300/40">
      {(['es', 'en'] as const).map((l) => (
        <motion.button
          key={l}
          onClick={() => setLang(l)}
          whileTap={{ scale: 0.92 }}
          className={`text-[11px] font-sans font-bold tracking-wider px-2.5 py-1 rounded-full transition-all duration-300 ${
            lang === l ? 'bg-terracotta-300 text-cream shadow-sm' : 'text-clay-400 hover:text-clay-500'
          }`}
        >
          {l.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, lang } = useLang();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const navLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.assessment', href: '#assessment' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.instagram', href: '#instagram' },
    { key: 'nav.booking', href: '#booking' },
    { key: 'nav.contact', href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // Section not on this page (e.g. a service page) → go to the home page anchor.
    const home = lang === 'en' ? '/en/' : '/';
    window.location.href = `${home}${href}`;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-beige-100/92 backdrop-blur-xl shadow-sm shadow-sand-200/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-terracotta-200 via-terracotta-300 to-sand-300 origin-left"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
            className="flex flex-col leading-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-serif text-2xl font-bold text-clay-500 tracking-wide">Maca Salvo</span>
            <motion.span
              className="text-[9px] tracking-[0.35em] uppercase font-sans text-terracotta-300 font-semibold mt-0.5"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {t('navbar.subtitle')}
            </motion.span>
          </motion.a>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className="text-[12px] tracking-[0.15em] uppercase font-sans font-semibold text-clay-500 hover:text-terracotta-300 transition-colors duration-300 relative group"
              >
                {t(link.key)}
                <motion.span
                  className="absolute -bottom-0.5 left-0 h-px bg-terracotta-300 block"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </a>
            ))}
            <LanguageSwitch />
            <motion.a
              href="#booking"
              onClick={(e) => { e.preventDefault(); handleNav('#booking'); }}
              className="btn-primary text-[11px] py-2.5 px-5 font-bold relative overflow-hidden"
              whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(196,113,74,0.3)' }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%', skewX: -15 }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.4 }}
              />
              {t('nav.cta')}
            </motion.a>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitch />
            <motion.button
              className="text-clay-500 hover:text-terracotta-300 transition-colors p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 28px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 28px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 28px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-beige-100/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <motion.div className="flex flex-col leading-none items-center mb-8"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="font-serif text-3xl font-bold text-clay-500 tracking-wide">Maca Salvo</span>
              <span className="text-[9px] tracking-[0.35em] uppercase font-sans text-terracotta-300 font-semibold mt-1">{t('navbar.subtitle')}</span>
            </motion.div>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className="text-sm tracking-[0.2em] uppercase font-sans font-semibold text-clay-500 hover:text-terracotta-300 transition-colors duration-300 relative group"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-terracotta-300 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <motion.a
              href="#booking"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => { e.preventDefault(); handleNav('#booking'); }}
              className="btn-primary mt-4 font-bold"
            >
              {t('nav.cta')}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
