import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Facebook as FacebookIcon, ExternalLink, Share2 } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { BUSINESS } from '../../seo.config';

const PLUGIN_HEIGHT = 640;

export default function FacebookSection() {
  const ref = useRef(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t, lang } = useLang();
  const [width, setWidth] = useState(500);

  // El Page Plugin necesita un ancho fijo (180–500 px): lo medimos del
  // contenedor para que sea responsive en móvil.
  useEffect(() => {
    const measure = () => {
      const el = boxRef.current;
      if (!el) return;
      setWidth(Math.max(280, Math.min(500, Math.floor(el.clientWidth) - 16)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Iframe directo del Page Plugin (sin JS SDK): carga determinística,
  // sin problemas de timing de FB.XFBML.parse en React.
  const locale = lang === 'es' ? 'es_LA' : 'en_US';
  const pluginSrc =
    'https://www.facebook.com/plugins/page.php' +
    `?href=${encodeURIComponent(BUSINESS.facebook)}` +
    '&tabs=timeline' +
    `&width=${width}` +
    `&height=${PLUGIN_HEIGHT}` +
    '&small_header=false' +
    '&adapt_container_width=true' +
    '&hide_cover=false' +
    '&show_facepile=true' +
    `&locale=${locale}`;

  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(BUSINESS.facebook)}`;

  return (
    <section id="facebook" className="relative py-20 lg:py-24 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #FAF5EC 0%, #F5EDD6 60%, #EDE0C4 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FacebookIcon size={20} className="text-terracotta-300" />
            <span className="section-label">{t('facebook.label')}</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-clay-500 mb-4">
            Expansión <em className="text-gradient not-italic">Holística</em>
          </h2>
          <p className="font-sans font-light text-clay-400 max-w-lg mx-auto leading-relaxed">
            {t('facebook.subtitle')}
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-[520px] mx-auto"
        >
          <div ref={boxRef} className="glass-card border border-sand-300 overflow-hidden p-2 flex justify-center">
            <iframe
              key={`${width}-${locale}`}
              src={pluginSrc}
              width={width}
              height={PLUGIN_HEIGHT}
              style={{ border: 'none', overflow: 'hidden', maxWidth: '100%', borderRadius: '12px' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Expansión Holística en Facebook"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <motion.a
            href={BUSINESS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FacebookIcon size={15} />
            {t('facebook.follow')}
            <ExternalLink size={12} />
          </motion.a>
          <motion.a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-sans font-semibold text-clay-500 hover:text-terracotta-300 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Share2 size={13} />
            {t('facebook.share')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
