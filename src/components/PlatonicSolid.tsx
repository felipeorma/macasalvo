import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { SolidKey } from '../geometryTest.data';

type V3 = [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;
const TILT = 0.5;
const RADIUS = 78;

function rawVertices(key: SolidKey): V3[] {
  switch (key) {
    case 'tetrahedron':
      return [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
    case 'cube': {
      const v: V3[] = [];
      for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) v.push([x, y, z]);
      return v;
    }
    case 'octahedron':
      return [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    case 'icosahedron': {
      const v: V3[] = [];
      for (const a of [-1, 1]) for (const b of [-PHI, PHI]) v.push([0, a, b], [a, b, 0], [b, 0, a]);
      return v;
    }
    case 'dodecahedron': {
      const v: V3[] = [];
      for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) v.push([x, y, z]);
      const ip = 1 / PHI;
      for (const a of [-1, 1]) for (const b of [-PHI, PHI]) v.push([0, a * ip, b], [a * ip, b, 0], [b, 0, a * ip]);
      return v;
    }
  }
}

// Las aristas de un sólido platónico son los pares de vértices a la distancia mínima.
function buildGeometry(key: SolidKey) {
  const raw = rawVertices(key);
  const maxNorm = Math.max(...raw.map(([x, y, z]) => Math.hypot(x, y, z)));
  const verts = raw.map(([x, y, z]) => [x / maxNorm, y / maxNorm, z / maxNorm] as V3);
  const dist = (a: V3, b: V3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  let min = Infinity;
  for (let i = 0; i < verts.length; i++)
    for (let j = i + 1; j < verts.length; j++) min = Math.min(min, dist(verts[i], verts[j]));
  const edges: [number, number][] = [];
  for (let i = 0; i < verts.length; i++)
    for (let j = i + 1; j < verts.length; j++)
      if (Math.abs(dist(verts[i], verts[j]) - min) < 1e-6) edges.push([i, j]);
  return { verts, edges };
}

const GEOMETRY = {
  tetrahedron: buildGeometry('tetrahedron'),
  cube: buildGeometry('cube'),
  octahedron: buildGeometry('octahedron'),
  icosahedron: buildGeometry('icosahedron'),
  dodecahedron: buildGeometry('dodecahedron'),
} satisfies Record<SolidKey, { verts: V3[]; edges: [number, number][] }>;

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

  const { verts, edges } = GEOMETRY[solid];
  const cosY = Math.cos(angle);
  const sinY = Math.sin(angle);
  const cosX = Math.cos(TILT);
  const sinX = Math.sin(TILT);

  const pts = verts.map(([x, y, z]) => {
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;
    return { px: 100 + x1 * RADIUS, py: 100 - y2 * RADIUS, depth: (z2 + 1) / 2 };
  });

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
