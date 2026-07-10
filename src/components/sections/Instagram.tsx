import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram as InstagramIcon, ExternalLink, Play, RefreshCw } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { BUSINESS } from '../../seo.config';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const INSTAGRAM_TOKEN = import.meta.env.VITE_INSTAGRAM_TOKEN as string;

const IG_PROFILE_URL = `${BUSINESS.instagram}/`;
const IG_SCRIPT_ID = 'instagram-embed-js';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

interface InstagramPost {
  id: string;
  type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  url: string;
  permalink: string;
  caption: string;
  timestamp: string;
}

// Loads Instagram's official embed.js once and processes embeds.
// Defensive: handles the script tag already existing (e.g. prerendered HTML).
function ensureIgEmbed(onReady: () => void) {
  if (window.instgrm) {
    onReady();
    return;
  }
  if (!document.getElementById(IG_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = IG_SCRIPT_ID;
    script.async = true;
    script.src = 'https://www.instagram.com/embed.js';
    document.head.appendChild(script);
  }
  let tries = 0;
  const timer = window.setInterval(() => {
    tries += 1;
    if (window.instgrm) {
      window.clearInterval(timer);
      onReady();
    } else if (tries > 100) {
      window.clearInterval(timer); // fallback link inside the blockquote still works
    }
  }, 200);
}

// Official Instagram profile embed — real profile data, no invented posts.
function ProfileEmbed() {
  useEffect(() => {
    ensureIgEmbed(() => window.instgrm?.Embeds.process());
  }, []);

  return (
    <div className="w-full max-w-[540px] mx-auto">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={IG_PROFILE_URL}
        data-instgrm-version="14"
        style={{
          background: '#FFFFFF',
          border: 0,
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(90, 74, 66, 0.08)',
          margin: '0 auto',
          maxWidth: '540px',
          minWidth: '280px',
          padding: 0,
          width: '100%',
        }}
      >
        {/* Built-in fallback while the embed loads or if it is blocked */}
        <a
          href={IG_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-8 text-center font-sans text-sm text-clay-500 underline underline-offset-2"
        >
          @expansion_holistiica
        </a>
      </blockquote>
    </div>
  );
}

function RealGrid({ posts, isInView }: { posts: InstagramPost[]; isInView: boolean }) {
  return (
    <>
      {posts.map((post, i) => (
        <motion.a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="relative group overflow-hidden rounded-2xl aspect-square block"
        >
          {post.url ? (
            <img
              src={post.url}
              alt={post.caption?.slice(0, 80) || 'Instagram post'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-terracotta-100 to-sand-200 flex items-center justify-center">
              <InstagramIcon size={28} className="text-terracotta-300 opacity-40" />
            </div>
          )}
          {post.type === 'VIDEO' && (
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <Play size={10} className="text-clay-500 fill-clay-500 ml-0.5" />
            </div>
          )}
          {post.type === 'CAROUSEL_ALBUM' && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <span className="text-[10px] text-clay-500 leading-none font-bold">+</span>
            </div>
          )}
          <div className="absolute inset-0 bg-clay-500/65 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-5 backdrop-blur-sm">
            {post.caption && (
              <p className="text-xs font-sans text-cream leading-snug text-center line-clamp-4">{post.caption}</p>
            )}
            <ExternalLink size={14} className="text-cream/70" />
          </div>
        </motion.a>
      ))}
    </>
  );
}

export default function Instagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLang();
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [usingReal, setUsingReal] = useState(false);

  useEffect(() => {
    if (!INSTAGRAM_TOKEN || !SUPABASE_URL) return;
    setLoading(true);

    const url = `${SUPABASE_URL}/functions/v1/instagram-feed?limit=6&token=${encodeURIComponent(INSTAGRAM_TOKEN)}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data: { posts?: InstagramPost[] }) => {
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts.slice(0, 3));
          setUsingReal(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="instagram" className="relative py-28 lg:py-36 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #EDE0C4 0%, #F5EDD6 50%, #FAF5EC 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <InstagramIcon size={20} className="text-terracotta-300" />
            <span className="section-label">{t('instagram.label')}</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-clay-500 mb-4">
            @<em className="text-gradient not-italic">expansion_holistiica</em>
          </h2>
          <p className="font-sans font-light text-clay-400 max-w-lg mx-auto leading-relaxed">
            {t('instagram.subtitle')}
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}>
              <RefreshCw size={22} className="text-terracotta-300 opacity-60" />
            </motion.div>
          </div>
        ) : usingReal ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <RealGrid posts={posts} isInView={isInView} />
          </div>
        ) : (
          <ProfileEmbed />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <motion.a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <InstagramIcon size={15} />
            {t('instagram.btn')}
            <ExternalLink size={12} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
