const { defineConfig } = require('cypress')

module.exports = defineConfig({
  wiewportHeight: 880,
  wiewportWidth: 1280,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {},
  },
})
