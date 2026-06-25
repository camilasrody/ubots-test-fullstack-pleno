import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:4173',
    specPattern: 'tests/e2e/cypress/e2e/**/*.cy.js',
    supportFile: 'tests/e2e/cypress/support/e2e.js',
  },
  video: false,
  screenshotOnRunFailure: true,
  chromeWebSecurity: true,
})
