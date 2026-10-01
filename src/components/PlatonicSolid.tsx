import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { SolidKey } from '../geometryTest.data';
import { projectSolid } from '../solidGeometry';

interface Props {
  solid: SolidKey;
  color: string;
  label: string;
  size?: number;
  speed?: number;
  className?: string;
}

export default function PlatonicSolid({ solid, color, label, size = 160, speed = 0.5, className }: Props) {
  const reduced = useReducedMotion();
  const [angle, setAngle] = useState(0.7);
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(true);

  // No animar lo que está fuera de pantalla (ahorra batería en el celular).
  useEffect(() => {
    const el = svgRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setAngle((a) => a + dt * speed);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, visible, speed]);

  const { pts, edges } = projectSolid(solid, angle);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={label}
      className={className}
      data-solid={solid}
    >
      <circle cx="100" cy="100" r="92" fill={color} opacity="0.07" />
      <g stroke={color} strokeLinecap="round" fill="none">
        {edges.map(([a, b]) => {
          const d = (pts[a].depth + pts[b].depth) / 2;
          return (
            <line
              key={`${a}-${b}`}
              x1={pts[a].px}
              y1={pts[a].py}
              x2={pts[b].px}
              y2={pts[b].py}
              strokeWidth={1.2 + d * 0.8}
              opacity={0.25 + d * 0.65}
            />
          );
        })}
      </g>
      <g fill={color}>
        {pts.map((p, i) => (
          <circle key={i} cx={p.px} cy={p.py} r={1.6 + p.depth * 1.8} opacity={0.35 + p.depth * 0.6} />
        ))}
      </g>
    </svg>
  );
}
