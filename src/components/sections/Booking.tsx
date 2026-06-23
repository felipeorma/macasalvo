import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, Calendar, CreditCard, Info, ChevronDown, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const services = [
  { id: 'access-bars',      name: 'Access Bars',                    modality: 'In-Person', duration: '90 min' },
  { id: 'sound-bath',       name: 'Sound Bath',                     modality: 'Hybrid',    duration: '60 min' },
  { id: 'karnak-pendulum',  name: 'Karnak Pendulum Cleansing',       modality: 'Online',    duration: '60 min' },
  { id: 'womens-circle',    name: "Women's Circle",                  modality: 'Hybrid',    duration: '120 min' },
  { id: 'sacred-geometry',  name: 'Sacred Geometry Harmonization',   modality: 'Online',    duration: '75 min' },
  { id: 'sound-bath-group', name: 'Group Sound Bath Online',         modality: 'Online',    duration: '60 min' },
];

const stripeLinks: Record<string, Partial<Record<string, string>>> = {
  'access-bars':     { 'In-Person': 'https://buy.stripe.com/14AeV6eR55wadd4eIh7AI05' },
  'sound-bath':      { 'In-Person': 'https://buy.stripe.com/eVq14gbETgaO2yq43D7AI03', 'Online': 'https://buy.stripe.com/5kQ9AMdN1e2G4Gy0Rr7AI04' },
  'karnak-pendulum': { 'Online': 'https://buy.stripe.com/28EdR27oDbUyflc1Vv7AI06' },
  'womens-circle':   { 'In-Person': 'https://buy.stripe.com/5kQ00c6kz8Im6OG0Rr7AI07', 'Online': 'https://buy.stripe.com/5kQ00c6kz8Im6OG0Rr7AI07' },
  'sacred-geometry':  { 'Online': 'https://buy.stripe.com/cNi6oAeR53o21um9nX7AI01' },
  'sound-bath-group': { 'Online': 'https://buy.stripe.com/14A9AM6kze2Gc90dEd7AI08' },
};

// Available time slots — Mon/Wed/Fri mornings + Sat all day
const TIME_SLOTS = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30'];

function getMinDate(modality: string): Date {
  const min = new Date();
  min.setHours(0, 0, 0, 0);
  if (modality === 'In-Person') min.setDate(min.getDate() + 2);
  else min.setDate(min.getDate() + 1);
  return min;
}

function isAvailableDay(date: Date, minDate: Date): boolean {
  if (date < minDate) return false;
  const day = date.getDay();
  if (day >= 1 && day <= 5) return true; // Mon–Fri always available
  if (day === 6) {
    // Every other Saturday — use ISO week number parity
    const jan1 = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil(((date.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
    return week % 2 === 0;
  }
  return false;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

interface CalendarPickerProps {
  selected: Date | null;
  onSelect: (d: Date) => void;
  lang: 'en' | 'es';
  minDate: Date;
}

function CalendarPicker({ selected, onSelect, lang, minDate }: CalendarPickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(minDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(minDate.getMonth());

  const monthNames = lang === 'es'
    ? ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    : ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const dayNames = lang === 'es'
    ? ['Do','Lu','Ma','Mi','Ju','Vi','Sa']
    : ['Su','Mo','Tu','We','Th','Fr','Sa'];

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const canGoPrev = viewYear > minDate.getFullYear() || (viewYear === minDate.getFullYear() && viewMonth > minDate.getMonth());

  return (
    <div className="glass-card p-4 rounded-2xl border border-sand-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-terracotta-100/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} className="text-clay-400" />
        </button>
        <span className="font-serif text-base text-clay-500">
          {monthNames[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-terracotta-100/60 transition-colors"
        >
          <ChevronRight size={16} className="text-clay-400" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map(d => (
          <div key={d} className="text-center text-[10px] tracking-widest uppercase text-clay-400/60 font-sans py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(viewYear, viewMonth, day);
          date.setHours(0, 0, 0, 0);
          const available = isAvailableDay(date, minDate);
          const isSelected = selected && isSameDay(date, selected);
          const isToday = isSameDay(date, today);
          const isBlocked = date >= today && date < minDate;

          return (
            <button
              key={day}
              disabled={!available}
              onClick={() => available && onSelect(date)}
              title={isBlocked ? (lang === 'es' ? 'No disponible — requiere 2 días de anticipación' : 'Not available — requires 2 days notice') : undefined}
              className={`
                relative mx-auto w-8 h-8 rounded-xl text-xs font-sans transition-all duration-200 flex items-center justify-center
                ${isSelected ? 'bg-terracotta-300 text-white shadow-md' : ''}
                ${!isSelected && available ? 'hover:bg-terracotta-100/70 text-clay-500 cursor-pointer' : ''}
                ${isBlocked ? 'bg-sand-100/60 text-clay-400/40 cursor-not-allowed line-through' : ''}
                ${!available && !isBlocked ? 'text-clay-400/30 cursor-not-allowed' : ''}
                ${isToday && !isSelected ? 'ring-1 ring-terracotta-200' : ''}
              `}
            >
              {day}
              {available && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terracotta-200" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface TimeSlotPickerProps {
  selected: string;
  onSelect: (t: string) => void;
  lang: 'en' | 'es';
}

function TimeSlotPicker({ selected, onSelect, lang }: TimeSlotPickerProps) {
  const label = lang === 'es' ? 'Elige un Horario' : 'Choose a Time Slot';
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase font-sans text-clay-400 mb-3">
        {label}
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {TIME_SLOTS.map(slot => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className={`py-2.5 px-3 rounded-xl border text-xs font-sans transition-all duration-200 flex items-center justify-center gap-1.5
              ${selected === slot
                ? 'bg-terracotta-300 border-terracotta-300 text-white shadow-md'
                : 'border-sand-300 bg-white/30 hover:border-terracotta-200 text-clay-500'}
            `}
          >
            <Clock size={11} className={selected === slot ? 'text-white/80' : 'text-clay-400'} />
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t, lang } = useLang();

  const [selectedService, setSelectedService] = useState('');
  const [selectedModality, setSelectedModality] = useState('');
  const [serviceOpen, setServiceOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');

  const chosen = services.find((s) => s.id === selectedService);
  const availableModalities =
    chosen?.modality === 'In-Person'
      ? ['In-Person']
      : chosen?.modality === 'Online'
      ? ['Online']
      : ['In-Person', 'Online'];

  const handleServiceSelect = (id: string) => {
    const svc = services.find((s) => s.id === id);
    setSelectedService(id);
    setSelectedModality(svc?.modality === 'In-Person' ? 'In-Person' : svc?.modality === 'Online' ? 'Online' : '');
    setSelectedDate(null);
    setSelectedTime('');
    setServiceOpen(false);
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-US', {
      weekday: 'long', day: 'numeric', month: 'long'
    });
  };

  const stripeUrl = selectedService && selectedModality
    ? stripeLinks[selectedService]?.[selectedModality]
    : undefined;

  const canCheckout = selectedService && selectedModality && selectedDate && selectedTime;

  const buildStripeUrl = () => {
    if (!stripeUrl || !selectedDate || !selectedTime) return stripeUrl || '';
    const dateStr = encodeURIComponent(formatDate(selectedDate));
    const sep = stripeUrl.includes('?') ? '&' : '?';
    return `${stripeUrl}${sep}prefilled_custom_field_1=${dateStr}+${selectedTime}`;
  };

  return (
    <section id="booking" className="relative py-28 lg:py-36 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(160deg, #FAF5EC 0%, #EDE0C4 40%, #F5EDD6 80%, #EDD8D4 100%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label">{t('booking.label')}</span>
          <h2 className="font-serif text-5xl md:text-6xl text-clay-500 mt-4 mb-4">
            {t('booking.title.1')} <em className="text-gradient not-italic">{t('booking.title.2')}</em>
          </h2>
          <p className="font-sans font-light text-clay-400 max-w-lg mx-auto leading-relaxed">
            {t('booking.subtitle')}
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* LEFT — booking flow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-2xl text-clay-500">{t('booking.select.session')}</h3>

            {/* Step 1 — Therapy */}
            <div>
              <label className="block text-xs tracking-widest uppercase font-sans text-clay-400 mb-2">
                {t('booking.choose.therapy')}
              </label>
              <div className="relative">
                <button
                  onClick={() => setServiceOpen(!serviceOpen)}
                  className="w-full p-4 text-left glass-card border border-sand-300 hover:border-terracotta-200 transition-colors flex items-center justify-between"
                >
                  <span className={`font-sans text-sm ${selectedService ? 'text-clay-500' : 'text-clay-400/60'}`}>
                    {chosen ? t(`therapy.${chosen.id}`) : t('booking.select.placeholder')}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-clay-400 transition-transform duration-300 ${serviceOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {serviceOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 z-20 mt-1 glass-card border border-sand-200 shadow-lg overflow-hidden"
                    >
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleServiceSelect(s.id)}
                          className="w-full p-4 text-left hover:bg-terracotta-100/50 transition-colors flex items-center justify-between border-b border-sand-200/50 last:border-0"
                        >
                          <div>
                            <div className="font-sans text-sm text-clay-500">{t(`therapy.${s.id}`)}</div>
                            <div className="text-xs text-clay-400 font-sans mt-0.5">{s.duration}</div>
                          </div>
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-sans tracking-widest uppercase ${
                            s.modality === 'In-Person' ? 'bg-terracotta-100 text-terracotta-400' :
                            s.modality === 'Online' ? 'bg-gold-100 text-gold-500' :
                            'bg-sage-100 text-sage-600'
                          }`}>
                            {s.modality === 'Hybrid' ? t('services.modality.remote') : s.modality === 'Online' ? t('services.modality.remoteonly') : t('services.modality.inperson')}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Step 2 — Modality */}
            <AnimatePresence>
              {selectedService && (
                <motion.div
                  key="modality"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <label className="block text-xs tracking-widest uppercase font-sans text-clay-400 mb-2">
                    {t('booking.session.format')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {availableModalities.map((mod) => (
                      <button
                        key={mod}
                        onClick={() => { setSelectedModality(mod); setSelectedDate(null); setSelectedTime(''); }}
                        className={`p-4 rounded-2xl border text-center transition-all duration-300 ${
                          selectedModality === mod
                            ? 'border-terracotta-300 bg-terracotta-100/60 shadow-md'
                            : 'border-sand-300 bg-white/30 hover:border-terracotta-200'
                        }`}
                      >
                        <div className="flex justify-center mb-2">
                          {mod === 'In-Person' ? (
                            <MapPin size={18} className="text-terracotta-300" />
                          ) : (
                            <Globe size={18} className="text-sage-400" />
                          )}
                        </div>
                        <div className="font-sans text-sm text-clay-500">
                          {mod === 'In-Person' ? t('services.modality.inperson') : t('services.modality.remoteonly')}
                        </div>
                      </button>
                    ))}
                  </div>
                  {chosen?.modality === 'In-Person' && (
                    <div className="flex items-start gap-2 mt-3 p-3 rounded-xl bg-terracotta-100/40 border border-terracotta-100">
                      <Info size={13} className="text-terracotta-300 mt-0.5 flex-shrink-0" />
                      <p className="text-xs font-sans text-clay-400 leading-relaxed">
                        {t('booking.inperson.only')}
                      </p>
                    </div>
                  )}
                  {chosen?.modality === 'Online' && (
                    <div className="flex items-start gap-2 mt-3 p-3 rounded-xl bg-gold-100/40 border border-gold-200">
                      <Info size={13} className="text-gold-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs font-sans text-clay-400 leading-relaxed">
                        {t('booking.online.only')}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3 — Calendar */}
            <AnimatePresence>
              {selectedService && selectedModality && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <label className="block text-xs tracking-widest uppercase font-sans text-clay-400">
                    {t('booking.choose.date')}
                  </label>
                  <CalendarPicker
                    selected={selectedDate}
                    onSelect={(d) => { setSelectedDate(d); setSelectedTime(''); }}
                    lang={lang}
                    minDate={getMinDate(selectedModality)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4 — Time slots */}
            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  key="timeslots"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs font-sans text-clay-400">
                    <Calendar size={13} className="text-terracotta-300" />
                    <span className="capitalize">{formatDate(selectedDate)}</span>
                  </div>
                  <TimeSlotPicker selected={selectedTime} onSelect={setSelectedTime} lang={lang} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 5 — CTA */}
            <AnimatePresence>
              {canCheckout && (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="pt-2 space-y-3"
                >
                  {stripeUrl ? (
                    <motion.a
                      href={buildStripeUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CreditCard size={15} />
                      {t('booking.pay.cta')}
                    </motion.a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-sand-100/60 border border-sand-200">
                      <Info size={13} className="text-clay-400 flex-shrink-0" />
                      <p className="text-xs font-sans text-clay-400">{t('booking.link.soon')}</p>
                    </div>
                  )}
                  <p className="text-[11px] text-center text-clay-400 font-sans">
                    {t('booking.stripe.note')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT — info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-serif text-2xl text-clay-500 mb-6">{t('booking.good.to.know')}</h3>

            {[
              {
                icon: Globe,
                titleKey: 'booking.online.title',
                descKey: 'booking.online.desc',
                color: 'bg-sage-100',
                iconColor: 'text-sage-500',
              },
              {
                icon: MapPin,
                titleKey: 'booking.inperson.title',
                descKey: 'booking.inperson.desc',
                color: 'bg-terracotta-100',
                iconColor: 'text-terracotta-300',
              },
              {
                icon: Calendar,
                titleKey: 'booking.scheduling.title',
                descKey: 'booking.scheduling.desc',
                color: 'bg-sand-100',
                iconColor: 'text-sand-500',
              },
              {
                icon: CreditCard,
                titleKey: 'booking.payments.title',
                descKey: 'booking.payments.desc',
                color: 'bg-rose-100',
                iconColor: 'text-rose-400',
              },
            ].map((card, i) => (
              <motion.div
                key={card.titleKey}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.6 }}
                className="glass-card p-5 flex gap-4 hover:shadow-md hover:shadow-sand-200/50 transition-shadow duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <card.icon size={18} className={card.iconColor} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-clay-500 mb-1">{t(card.titleKey)}</h4>
                  <p className="text-xs font-sans font-light text-clay-400 leading-relaxed">{t(card.descKey)}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="glass-card p-6 text-center border border-terracotta-200"
            >
              <p className="font-serif text-lg text-clay-500 italic mb-3">
                "{t('booking.unsure')}"
              </p>
              <motion.button
                onClick={() => document.querySelector('#assessment')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary text-[10px] py-2.5 px-5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('booking.assessment.cta')}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
