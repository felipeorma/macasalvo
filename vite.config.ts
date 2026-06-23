import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Base path:
//  - Con dominio propio (existe public/CNAME)  -> '/'  (sitio en la raíz)
//  - Sin dominio (GitHub Pages de proyecto)    -> '/macasalvo/'
// Así el preview en felipeorma.github.io/macasalvo funciona, y cambia solo
// a '/' apenas se agregue el archivo public/CNAME con tu dominio.
const hasDomain = existsSync(fileURLToPath(new URL('./public/CNAME', import.meta.url)));
const base = hasDomain ? '/' : '/macasalvo/';

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
