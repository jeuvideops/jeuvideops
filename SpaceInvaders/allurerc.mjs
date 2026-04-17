import {defineConfig} from 'allure';

export default defineConfig({
  name: 'SpaceInvaders Allure Reports',
  output: '.out/allure-report',
  plugins: {
    awesomeUnit: {
      import: '@allurereport/plugin-awesome',
      options: {
        reportName: 'SpaceInvaders: Unit test',
        singleFile: false,
        open: false,
        filter: ({labels}) => labels.find(({name, value}) => name === 'framework' && value === 'vitest'),
        publish: true,
      },
    },
    awesomeE2E: {
      import: '@allurereport/plugin-awesome',
      options: {
        reportName: 'SpaceInvaders: E2E test',
        singleFile: false,
        open: false,
        filter: ({labels}) => labels.find(({name, value}) => name === 'framework' && value === 'playwright'),
        publish: true,
      },
    },
  },
});
