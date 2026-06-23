import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ── SVG shapes ──────────────────────────────────────────────────────────────

const SacredGeometry = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="100" cy="40" r="60" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="100" cy="160" r="60" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="48" cy="70" r="60" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="152" cy="70" r="60" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="48" cy="130" r="60" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="152" cy="130" r="60" stroke="currentColor" strokeWidth="0.5" />
    <polygon points="100,20 176,150 24,150" stroke="currentColor" strokeWidth="0.5" fill="none" />
    <polygon points="100,180 176,50 24,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
  </svg>
);

const FlowerOfLife = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.4" />
    <circle cx="100" cy="70" r="30" stroke="currentColor" strokeWidth="0.4" />
    <circle cx="100" cy="130" r="30" stroke="currentColor" strokeWidth="0.4" />
    <circle cx="74" cy="85" r="30" stroke="currentColor" strokeWidth="0.4" />
    <circle cx="126" cy="85" r="30" stroke="currentColor" strokeWidth="0.4" />
    <circle cx="74" cy="115" r="30" stroke="currentColor" strokeWidth="0.4" />
    <circle cx="126" cy="115" r="30" stroke="currentColor" strokeWidth="0.4" />
    <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.3" />
    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.2" />
  </svg>
);

const Metatron = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.4" />
    {[0,1,2,3,4,5].map(i => {
      const a = (i * 60 - 90) * Math.PI / 180;
      const x = 100 + 50 * Math.cos(a);
      const y = 100 + 50 * Math.sin(a);
      return <circle key={i} cx={x} cy={y} r="30" stroke="currentColor" strokeWidth="0.35" />;
    })}
    {[0,1,2,3,4,5].map(i => {
      const a1 = (i * 60 - 90) * Math.PI / 180;
      const a2 = ((i + 1) * 60 - 90) * Math.PI / 180;
      const x1 = 100 + 80 * Math.cos(a1), y1 = 100 + 80 * Math.sin(a1);
      const x2 = 100 + 80 * Math.cos(a2), y2 = 100 + 80 * Math.sin(a2);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.35" />;
    })}
    {[0,1,2,3,4,5].map(i => {
      const a = (i * 60 - 90) * Math.PI / 180;
      const x = 100 + 80 * Math.cos(a);
      const y = 100 + 80 * Math.sin(a);
      return <line key={i} x1="100" y1="100" x2={x} y2={y} stroke="currentColor" strokeWidth="0.3" />;
    })}
    <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.4" />
  </svg>
);

// ── Canvas with connected particles ─────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const colors = ['#C4714A', '#C4887A', '#8A9E7A', '#C9A84C', '#DEC49A'];
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
      pulse: number; pulseSpeed: number;
    }[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.35 + 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.015,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const currentSize = p.size * (1 + 0.3 * Math.sin(p.pulse));
        const hex = Math.floor((p.opacity * (0.8 + 0.2 * Math.sin(p.pulse))) * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color + hex;
        ctx.fill();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(196, 113, 74, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />;
}

// ── 3D floating shape ────────────────────────────────────────────────────────

interface Shape3DProps {
  children: React.ReactNode;
  className: string;
  rotateSpeed: number;
  rotateDir?: number;
  floatDuration: number;
  floatDelay?: number;
  depth?: number;
}

function Shape3D({ children, className, rotateSpeed, rotateDir = 1, floatDuration, floatDelay = 0, depth = 1 }: Shape3DProps) {
  return (
    <motion.div
      className={className}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      animate={{
        rotateZ: rotateDir > 0 ? [0, 360] : [0, -360],
        rotateY: [0, 15 * depth, 0, -15 * depth, 0],
        y: [0, -20 * depth, 0],
      }}
      transition={{
        rotateZ: { duration: rotateSpeed, repeat: Infinity, ease: 'linear' },
        rotateY: { duration: floatDuration * 1.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
        y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Parallax scroll wrapper ──────────────────────────────────────────────────

function ParallaxLayer({ children, speed }: { children: React.ReactNode; speed: number }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, speed * 100]);
  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
      {children}
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <ParticleCanvas />

      {/* Slow parallax orbs — background layer */}
      <ParallaxLayer speed={-0.15}>
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(196,113,74,0.12) 0%, transparent 65%)' }}
          animate={{ x: [0, 35, 0], y: [0, 22, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[5%] left-[15%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 65%)' }}
          animate={{ x: [0, 20, 0], y: [0, -28, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        />
      </ParallaxLayer>

      {/* Mid parallax orbs */}
      <ParallaxLayer speed={-0.25}>
        <motion.div
          className="absolute top-[25%] right-[-12%] w-[550px] h-[550px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(138,158,122,0.11) 0%, transparent 65%)' }}
          animate={{ x: [0, -28, 0], y: [0, 32, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <motion.div
          className="absolute top-[55%] left-[45%] w-[380px] h-[380px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(196,136,122,0.09) 0%, transparent 65%)' }}
          animate={{ x: [0, -18, 0], y: [0, 18, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 9 }}
        />
      </ParallaxLayer>

      {/* 3D Geometric shapes — slowest parallax */}
      <ParallaxLayer speed={-0.4}>
        <Shape3D
          className="absolute top-[4%] right-[4%] w-52 h-52 text-terracotta-200 opacity-[0.18]"
          rotateSpeed={55} rotateDir={1} floatDuration={14} depth={1.2}
        >
          <SacredGeometry />
        </Shape3D>

        <Shape3D
          className="absolute bottom-[18%] left-[2%] w-44 h-44 text-sage-300 opacity-[0.22]"
          rotateSpeed={42} rotateDir={-1} floatDuration={18} floatDelay={2} depth={0.8}
        >
          <FlowerOfLife />
        </Shape3D>

        <Shape3D
          className="absolute top-[38%] right-[1%] w-36 h-36 text-gold-300 opacity-[0.18]"
          rotateSpeed={38} rotateDir={1} floatDuration={12} floatDelay={4} depth={1.5}
        >
          <Metatron />
        </Shape3D>

        <Shape3D
          className="absolute top-[68%] right-[18%] w-28 h-28 text-rose-200 opacity-[0.20]"
          rotateSpeed={48} rotateDir={-1} floatDuration={16} floatDelay={7} depth={1}
        >
          <FlowerOfLife />
        </Shape3D>

        <Shape3D
          className="absolute top-[15%] left-[5%] w-24 h-24 text-terracotta-200 opacity-[0.15]"
          rotateSpeed={60} rotateDir={1} floatDuration={20} floatDelay={1} depth={0.6}
        >
          <Metatron />
        </Shape3D>

        <Shape3D
          className="absolute bottom-[5%] right-[8%] w-32 h-32 text-sand-400 opacity-[0.16]"
          rotateSpeed={45} rotateDir={-1} floatDuration={22} floatDelay={5} depth={1.3}
        >
          <SacredGeometry />
        </Shape3D>
      </ParallaxLayer>
    </div>
  );
}
