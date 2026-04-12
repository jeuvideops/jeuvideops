import {defineConfig} from 'allure';

export default defineConfig({
  output: './dashboard/TwoSpaceships',
  plugins: {
    awesome: {
      options: {
        reportName: 'TwoSpaceships',
        singleFile: true,
      },
    },
  },
});
