import {defineConfig} from 'allure';

export default defineConfig({
  output: './dashboard',
  plugins: {
    dashboard: {
      options: {
        reportName: 'JeuxVideOPS',
      },
    },
  },
});
