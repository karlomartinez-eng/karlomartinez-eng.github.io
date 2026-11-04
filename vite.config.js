import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset paths relative, so the same build works on
// username.github.io, username.github.io/repo-name, or a custom domain.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { sourcemap: false },
});
