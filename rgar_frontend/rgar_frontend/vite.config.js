import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'pages', replacement: '/src/pages' },
      { find: 'components', replacement: '/src/components' },
      { find: 'layouts', replacement: '/src/layouts' },
      { find: 'features', replacement: '/src/features' },
    ],
  },
  // define: {
  //   'process.env': process.env
  // }
})
