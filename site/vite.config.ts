import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset URLs so the build works from any path (hash routing keeps the document at the root).
  base: './',
  plugins: [react()],
});
