import type { Lang } from './context/LanguageContext';

// Test de Geometría Sagrada: una URL por idioma (con barra final, tal como las sirve GitHub Pages).
export const TEST_PATHS: Record<Lang, string> = {
  es: '/test-geometria-sagrada/',
  en: '/en/sacred-geometry-test/',
};

const trim = (p: string) => p.replace(/\/+$/, '').toLowerCase();

export function isGeometryTestPath(pathname: string): boolean {
  const p = trim(pathname);
  return p === trim(TEST_PATHS.es) || p === trim(TEST_PATHS.en);
}
