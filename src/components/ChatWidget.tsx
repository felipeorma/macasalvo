import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

async function sendToChat(messages: Message[]): Promise<string> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/maca-chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error('Chat error');
  const data = await res.json();
  return data.message ?? '';
}

const GREETINGS: Record<string, string> = {
  es: '¡Hola! Soy Luz, la asistente virtual de Maca Salvo ✨\n¿En qué puedo acompañarte hoy? Puedo orientarte sobre los servicios, terapias o cualquier duda que tengas.',
  en: 'Hello! I\'m Luz, Maca Salvo\'s virtual assistant ✨\nHow can I support you today? I can guide you about services, therapies, or any questions you have.',
};

const SUGGESTIONS: Record<string, string[]> = {
  es: ['¿Qué es el Baño de Sonido?', '¿Cómo reservo?', '¿Hay sesiones online?'],
  en: ['What is a Sound Bath?', 'How do I book?', 'Are there online sessions?'],
};

const ERROR_MSG: Record<string, string> = {
  es: 'Lo siento, hubo un problema. Por favor intenta de nuevo.',
  en: 'Sorry, there was an issue. Please try again.',
};

function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-terracotta-300"
          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [openedLang, setOpenedLang] = useState<string>(lang);
  const [showBadge, setShowBadge] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // When chat opens, set greeting in current lang and remember which lang was active
  const handleOpen = () => {
    setOpen(true);
    setShowBadge(false);
    setOpenedLang(lang);
    setMessages([{ role: 'assistant', content: GREETINGS[lang] ?? GREETINGS.en }]);
  };

  // If language changes while chat has no user messages yet, refresh greeting
  useEffect(() => {
    if (!open) return;
    if (lang === openedLang) return;
    setMessages((prev) => {
      const hasUserMsg = prev.some((m) => m.role === 'user');
      if (hasUserMsg) return prev;
      setOpenedLang(lang);
      return [{ role: 'assistant', content: GREETINGS[lang] ?? GREETINGS.en }];
    });
  }, [lang, open, openedLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const handleSend = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: msg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const reply = await sendToChat(newMessages);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: ERROR_MSG[lang] ?? ERROR_MSG.en },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = SUGGESTIONS[lang] ?? SUGGESTIONS.en;
  const hasUserMsg = messages.some((m) => m.role === 'user');

  return (
    <>
      {/* Floating button */}
      <div className="fixed left-5 bottom-8 z-50">
        <AnimatePresence>
          {!open && showBadge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-10 left-0 bg-white/90 backdrop-blur-md border border-terracotta-100 text-clay-500 text-xs font-sans px-3 py-1.5 rounded-full shadow-md whitespace-nowrap pointer-events-none"
            >
              {t('chat.badge')}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          animate={{ boxShadow: ['0 0 0 0 rgba(196,113,74,0.3)', '0 0 0 12px rgba(196,113,74,0)', '0 0 0 0 rgba(196,113,74,0)'] }}
          transition={{ boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeOut' } }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-terracotta-300 to-terracotta-400 shadow-lg shadow-terracotta-300/40 flex items-center justify-center text-cream relative overflow-hidden"
          aria-label={t('chat.open')}
        >
          <motion.span
            className="absolute inset-0 bg-white/20"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%' }}
          />
          <MessageCircle size={22} className="relative z-10" />
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, originX: 0, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-5 bottom-28 z-50 w-[340px] max-w-[calc(100vw-2.5rem)] flex flex-col"
            style={{ height: '480px', maxHeight: 'calc(100vh - 160px)' }}
          >
            <div className="flex flex-col h-full glass-card border border-terracotta-100/60 shadow-2xl shadow-sand-300/40 overflow-hidden rounded-3xl">

              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-terracotta-300/90 to-terracotta-400/80 backdrop-blur-md flex-shrink-0">
                <motion.div
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 relative"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles size={16} className="text-cream" />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/40"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-cream font-sans font-semibold text-sm leading-none">Luz</p>
                  <p className="text-cream/70 text-[10px] font-sans tracking-wide mt-0.5">{t('chat.subtitle')}</p>
                </div>
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors"
                >
                  <X size={14} />
                </motion.button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0" style={{ scrollbarWidth: 'thin' }}>
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-terracotta-100 to-sand-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot size={12} className="text-terracotta-300" />
                        </div>
                      )}
                      <div
                        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm font-sans leading-relaxed whitespace-pre-line ${
                          msg.role === 'user'
                            ? 'bg-terracotta-300 text-cream rounded-br-sm'
                            : 'bg-white/60 backdrop-blur-sm border border-sand-200/60 text-clay-500 rounded-bl-sm'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-terracotta-100 to-sand-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={12} className="text-terracotta-300" />
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm border border-sand-200/60 rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick suggestions — show only before any user message */}
              {!hasUserMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="px-4 pb-2 flex gap-2 flex-wrap flex-shrink-0"
                >
                  {suggestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/50 border border-terracotta-100 text-terracotta-400 font-sans hover:bg-terracotta-50 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Input */}
              <div className="px-4 pb-4 pt-2 flex-shrink-0">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-sand-200 rounded-2xl px-3.5 py-2.5 focus-within:border-terracotta-200 transition-colors">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={t('chat.placeholder')}
                    disabled={loading}
                    className="flex-1 bg-transparent text-sm text-clay-500 placeholder-clay-300 font-sans outline-none min-w-0"
                  />
                  <motion.button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || loading}
                    whileHover={input.trim() && !loading ? { scale: 1.12 } : {}}
                    whileTap={input.trim() && !loading ? { scale: 0.9 } : {}}
                    className="w-8 h-8 rounded-xl bg-terracotta-300 disabled:bg-sand-200 flex items-center justify-center text-cream disabled:text-clay-300 transition-colors flex-shrink-0"
                  >
                    <Send size={14} className="-translate-x-px" />
                  </motion.button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
