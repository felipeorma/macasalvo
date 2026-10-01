import type { SolidKey } from './geometryTest.data';

type V3 = [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;
const TILT = 0.5;
export const SOLID_RADIUS = 78;

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

export interface ProjectedPoint {
  px: number;
  py: number;
  depth: number;
}

// Proyección del sólido girado `angle` radianes, en un cuadro de 200×200 centrado en (100, 100).
// `depth` va de 0 (al fondo) a 1 (al frente).
export function projectSolid(key: SolidKey, angle: number): { pts: ProjectedPoint[]; edges: [number, number][] } {
  const { verts, edges } = GEOMETRY[key];
  const cosY = Math.cos(angle);
  const sinY = Math.sin(angle);
  const cosX = Math.cos(TILT);
  const sinX = Math.sin(TILT);
  const pts = verts.map(([x, y, z]) => {
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;
    return { px: 100 + x1 * SOLID_RADIUS, py: 100 - y2 * SOLID_RADIUS, depth: (z2 + 1) / 2 };
  });
  return { pts, edges };
}
