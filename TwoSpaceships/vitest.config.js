import {configDefaults, defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['allure-vitest/setup'],
    include: ['test/unit/**/*.test.js'],
    exclude: [...configDefaults.exclude, 'test/e2e/**'],
    reporters: [
      'default',
      ['allure-vitest/reporter',
        {
          resultsDir: '.out/allure-results/',
        }],
      ...(process.env.GITHUB_ACTIONS ? ['github-actions'] : []),
    ],
    coverage: {
      provider: 'v8',
      reportOnFailure: true,
      reporter: ['text', 'html', 'lcov', 'json-summary', 'json'],
      reportsDirectory: '.out/coverage',
      include: ['src/**/*.{js,ts}'],
      exclude: ['test/**'],
    },
  },

  server: {
    sourcemapIgnoreList: (sourcePath) =>
      sourcePath.includes('allure-vitest'),
  },
});
