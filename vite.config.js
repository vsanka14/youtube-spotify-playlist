import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'youtube-spotify-playlist': path.resolve(__dirname, './src'),
    },
  },
});
