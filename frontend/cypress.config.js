import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Base URL for your app
    viewportWidth: 1280, // Set default viewport width for consistent tests
    viewportHeight: 720, // Set default viewport height for consistent tests
    video: true, // Enable video recording of tests (helpful for debugging)
    screenshotOnRunFailure: true, // Automatically take screenshots on failure
    setupNodeEvents(on, config) {
      // Custom events and listeners can be added here, for example, to manage authentication tokens
    },
  },
});
