import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig(({}) => {
  return {
    plugins: [vue()],
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, './src') },
        { find: '@@', replacement: resolve(__dirname, './') },
      ],
    },
  };
});
