const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {},
  },
  video: true,
  videosFolder: 'cypress/videos',
})
