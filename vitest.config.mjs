import {
  configDefaults,
  defineConfig,
  mergeConfig
} from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      watch: false,
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: [
          'text',
          'json',
          'html'
        ],
        exclude: [
          ...configDefaults.exclude,
          'components.json',
          '.eslintrc.cjs',
          'postcss.config.cjs',
          'tailwind.config.cjs',
          'dev-dist/**',
          'src/__test__/**',
          'src/App.tsx',
          'src/main.tsx',
          'src/mocks/**',
          'src/hooks/**',
          'src/**/**/config.ts',
          /*
          * this folder is exclusively for 'shadcn' components
          * please put your own components in /components and test it
          * */
          'src/components/ui/**',
          'src/router/**',
          'src/constants/**',
          'src/store/**',
          'src/api/middleware/**',
          'src/api/core.ts',
          'src/api/base.ts',
          'src/types/**',
          'src/vite-env.d.ts',
          '!src/store/database/**'
        ],
        thresholds: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        }
      },
      setupFiles: ['./src/setupTest.ts']
    }
  })
);