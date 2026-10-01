import type { Lang } from './context/LanguageContext';
import { COPY, SOLIDS, TEST_META, type SolidKey } from './geometryTest.data';
import { projectSolid } from './solidGeometry';
import { SITE_URL } from './seo.config';
import { TEST_PATHS } from './routes';

// Formato de historias de Instagram (9:16). Lo importante queda entre y≈280 y y≈1660,
// fuera de las franjas que Instagram tapa arriba (perfil) y abajo (barra de respuesta).
export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;

const SERIF = '"Cormorant Garamond", Georgia, "Times New Roman", serif';
const SANS = 'Jost, "Helvetica Neue", Arial, sans-serif';
const INK = '#7A3428';
const SOFT = '#B5614A';
const ACCENT = '#C4714A';

const SOLID_CENTER_Y = 720;
const SOLID_SCALE = 2.8;

async function loadFonts() {
  if (!document.fonts) return;
  await Promise.all([
    document.fonts.load('500 100px "Cormorant Garamond"'),
    document.fonts.load('italic 400 50px "Cormorant Garamond"'),
    document.fonts.load('italic 500 70px "Cormorant Garamond"'),
    document.fonts.load('400 30px Jost'),
    document.fonts.load('500 30px Jost'),
  ]).catch(() => undefined);
}

function rgba(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Texto centrado con espaciado entre letras (se dibuja letra por letra para no
// depender de ctx.letterSpacing, que no existe en navegadores más antiguos).
function drawSpaced(ctx: CanvasRenderingContext2D, text: string, cx: number, y: number, spacing: number) {
  const chars = [...text];
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
  let x = cx - total / 2;
  ctx.textAlign = 'left';
  chars.forEach((c, i) => {
    ctx.fillText(c, x, y);
    x += widths[i] + spacing;
  });
}

function spacedWidth(ctx: CanvasRenderingContext2D, text: string, spacing: number) {
  return [...text].reduce((sum, c) => sum + ctx.measureText(c).width, 0) + spacing * ([...text].length - 1);
}

// Reduce el tamaño de la letra hasta que el texto quepa en `maxWidth`.
function fitSize(ctx: CanvasRenderingContext2D, text: string, font: (px: number) => string, maxWidth: number, startPx: number, minPx: number) {
  let px = startPx;
  ctx.font = font(px);
  while (px > minPx && ctx.measureText(text).width > maxWidth) {
    px -= 2;
    ctx.font = font(px);
  }
  return px;
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    const attempt = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(attempt).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = attempt;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function firstSentence(text: string) {
  const i = text.indexOf('. ');
  return i > 0 ? text.slice(0, i + 1) : text;
}

export function storyFilename(solid: SolidKey, lang: Lang) {
  const slug = SOLIDS[solid][lang].name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  return `${lang === 'es' ? 'mi-solido-platonico' : 'my-platonic-solid'}-${slug}.png`;
}

export async function renderStoryImage(solid: SolidKey, lang: Lang): Promise<Blob> {
  await loadFonts();

  const W = STORY_WIDTH;
  const H = STORY_HEIGHT;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas no disponible');

  const info = SOLIDS[solid];
  const text = info[lang];
  const copy = COPY[lang];
  const color = info.color;
  const cx = W / 2;
  ctx.textBaseline = 'alphabetic';

  // Fondo
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#FAF5EC');
  bg.addColorStop(0.55, '#F5EDD6');
  bg.addColorStop(1, '#EDE0C4');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(cx, SOLID_CENTER_Y, 40, cx, SOLID_CENTER_Y, 520);
  glow.addColorStop(0, rgba(color, 0.22));
  glow.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 160, W, 1200);

  ctx.strokeStyle = rgba(color, 0.18);
  ctx.lineWidth = 2;
  for (const r of [290, 365]) {
    ctx.beginPath();
    ctx.arc(cx, SOLID_CENTER_Y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = rgba(ACCENT, 0.28);
  ctx.lineWidth = 3;
  roundedRect(ctx, 36, 36, W - 72, H - 72, 44);
  ctx.stroke();

  // Encabezado
  ctx.fillStyle = ACCENT;
  ctx.font = `500 30px ${SANS}`;
  drawSpaced(ctx, 'MACA SALVO', cx, 290, 12);
  ctx.fillStyle = SOFT;
  ctx.font = `400 26px ${SANS}`;
  drawSpaced(ctx, TEST_META[lang].h1.toUpperCase(), cx, 334, 7);

  ctx.textAlign = 'center';
  ctx.fillStyle = SOFT;
  ctx.font = `italic 400 54px ${SERIF}`;
  ctx.fillText(copy.storyIntro, cx, 424);

  // Sólido en 3D
  const { pts, edges } = projectSolid(solid, 0.62);
  const sx = (v: number) => cx + (v - 100) * SOLID_SCALE;
  const sy = (v: number) => SOLID_CENTER_Y + (v - 100) * SOLID_SCALE;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  for (const [a, b] of edges) {
    const d = (pts[a].depth + pts[b].depth) / 2;
    ctx.globalAlpha = 0.25 + d * 0.65;
    ctx.lineWidth = (1.2 + d * 0.8) * SOLID_SCALE;
    ctx.beginPath();
    ctx.moveTo(sx(pts[a].px), sy(pts[a].py));
    ctx.lineTo(sx(pts[b].px), sy(pts[b].py));
    ctx.stroke();
  }
  ctx.fillStyle = color;
  for (const p of pts) {
    ctx.globalAlpha = 0.35 + p.depth * 0.6;
    ctx.beginPath();
    ctx.arc(sx(p.px), sy(p.py), (1.6 + p.depth * 1.8) * SOLID_SCALE, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Nombre, elemento y esencia
  ctx.textAlign = 'center';
  ctx.fillStyle = INK;
  const namePx = fitSize(ctx, text.name, (px) => `500 ${px}px ${SERIF}`, 880, 150, 90);
  ctx.font = `500 ${namePx}px ${SERIF}`;
  ctx.fillText(text.name, cx, 1112);

  ctx.fillStyle = color;
  ctx.font = `italic 500 74px ${SERIF}`;
  ctx.fillText(text.element, cx, 1192);

  ctx.fillStyle = SOFT;
  const essence = text.essence.toUpperCase();
  let essencePx = 27;
  ctx.font = `400 ${essencePx}px ${SANS}`;
  while (essencePx > 20 && spacedWidth(ctx, essence, 5) > 900) {
    essencePx -= 1;
    ctx.font = `400 ${essencePx}px ${SANS}`;
  }
  drawSpaced(ctx, essence, cx, 1256, 5);

  // Frase del mensaje
  ctx.textAlign = 'center';
  ctx.fillStyle = INK;
  ctx.font = `italic 400 42px ${SERIF}`;
  const lines = wrapLines(ctx, firstSentence(text.message), 840).slice(0, 4);
  lines.forEach((line, i) => ctx.fillText(line, cx, 1338 + i * 56));

  // Pie: invitación y dirección del test
  ctx.strokeStyle = rgba(ACCENT, 0.6);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 80, 1556);
  ctx.lineTo(cx + 80, 1556);
  ctx.stroke();

  ctx.fillStyle = ACCENT;
  ctx.font = `500 24px ${SANS}`;
  drawSpaced(ctx, copy.storyDiscover.toUpperCase(), cx, 1602, 8);

  const url = `${SITE_URL}${TEST_PATHS[lang]}`.replace(/^https?:\/\//, '').replace(/\/$/, '');
  ctx.textAlign = 'center';
  ctx.fillStyle = INK;
  const urlPx = fitSize(ctx, url, (px) => `500 ${px}px ${SANS}`, 900, 34, 22);
  ctx.font = `500 ${urlPx}px ${SANS}`;
  ctx.fillText(url, cx, 1648);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('No se pudo crear la imagen'))), 'image/png');
  });
}
