import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Facebook as FacebookIcon, ExternalLink, Share2 } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { BUSINESS } from '../../seo.config';

declare global {
  interface Window {
    FB?: { XFBML: { parse: (el?: HTMLElement) => void } };
    fbAsyncInit?: () => void;
  }
}

const FB_SDK_ID = 'facebook-jssdk';

// Loads the Facebook JS SDK exactly once and parses the container.
// Defensive: handles the script tag already existing (e.g. prerendered HTML).
function ensureFbSdk(locale: string, onReady: () => void) {
  if (window.FB) {
    onReady();
    return;
  }
  const existing = document.getElementById(FB_SDK_ID);
  if (!existing) {
    // fb-root is required by the SDK
    if (!document.getElementById('fb-root')) {
      const root = document.createElement('div');
      root.id = 'fb-root';
      document.body.prepend(root);
    }
    const script = document.createElement('script');
    script.id = FB_SDK_ID;
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://connect.facebook.net/${locale}/sdk.js#xfbml=1&version=v21.0`;
    document.head.appendChild(script);
  }
  // Poll until the SDK is available (covers both fresh injection and preexisting tag)
  let tries = 0;
  const timer = window.setInterval(() => {
    tries += 1;
    if (window.FB) {
      window.clearInterval(timer);
      onReady();
    } else if (tries > 100) {
      window.clearInterval(timer); // give up after ~20s — fallback buttons still work
    }
  }, 200);
}

export default function FacebookSection() {
  const ref = useRef(null);
  const pluginRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t, lang } = useLang();

  useEffect(() => {
    const locale = lang === 'es' ? 'es_LA' : 'en_US';
    ensureFbSdk(locale, () => {
      if (pluginRef.current) window.FB?.XFBML.parse(pluginRef.current);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {/* Facebook Page Plugin — timeline + cover + follow button (parsed by the FB SDK) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-[520px] mx-auto"
        >
          <div ref={pluginRef} className="glass-card border border-sand-300 overflow-hidden p-2 flex justify-center min-h-[220px]">
            <div
              className="fb-page w-full"
              data-href={BUSINESS.facebook}
              data-tabs="timeline"
              data-width="500"
              data-height="640"
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            >
              {/* Built-in fallback while the plugin loads or if it is blocked */}
              <blockquote cite={BUSINESS.facebook} className="fb-xfbml-parse-ignore p-6 text-center">
                <a
                  href={BUSINESS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-clay-500 underline underline-offset-2"
                >
                  Expansión Holística — Facebook
                </a>
              </blockquote>
            </div>
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
