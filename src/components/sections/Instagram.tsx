import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram as InstagramIcon, ExternalLink, Play, RefreshCw } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const INSTAGRAM_TOKEN = import.meta.env.VITE_INSTAGRAM_TOKEN as string;

interface InstagramPost {
  id: string;
  type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  url: string;
  permalink: string;
  caption: string;
  timestamp: string;
}

const mockPosts = [
  { id: 'm1', bg: 'from-terracotta-100 to-rose-100', label: '✨', caption: 'Sound healing session — feel the frequencies restore your natural rhythm...', tag: '#SoundBath' },
  { id: 'm2', bg: 'from-sage-100 to-sand-100', label: '🌿', caption: 'Access Bars: releasing the charge behind every thought that limits you...', tag: '#AccessBars' },
  { id: 'm3', bg: 'from-gold-100 to-sand-200', label: '🔮', caption: 'Sacred geometry holds the codes of creation — work with the universe, not against it.', tag: '#GeometriaSagrada' },
];

function MockGrid({ isInView }: { isInView: boolean }) {
  return (
    <>
      {mockPosts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${post.bg} transition-transform duration-500 group-hover:scale-105`} />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <span className="text-4xl md:text-5xl select-none">{post.label}</span>
          </div>
          <div className="absolute inset-0 bg-clay-500/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-5 backdrop-blur-sm">
            <p className="text-xs font-sans text-cream leading-snug text-center line-clamp-3">{post.caption}</p>
            <span className="text-[10px] text-terracotta-200 font-sans tracking-widest">{post.tag}</span>
          </div>
        </motion.div>
      ))}
    </>
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
          {!usingReal && !loading && (
            <p className="text-xs font-sans text-clay-400/70 mt-4 tracking-wide italic">
              {t('instagram.preview')}
            </p>
          )}
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}>
              <RefreshCw size={22} className="text-terracotta-300 opacity-60" />
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {usingReal ? (
              <RealGrid posts={posts} isInView={isInView} />
            ) : (
              <MockGrid isInView={isInView} />
            )}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <motion.a
            href="https://www.instagram.com/expansion_holistiica"
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
