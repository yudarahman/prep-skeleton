import * as path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 3
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'css-cache'
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'script',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'js-cache',
              networkTimeoutSeconds: 3
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                // Cache image for 30 days
                maxAgeSeconds: 30 * 24 * 60 * 60
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Boilerplate Apps',
        short_name: 'Bapps',
        description: 'GIK Boilerplate Apps',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'public/assets/images/icon_gik_without_words.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'public/assets/images/icon_gik_without_words.svg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
