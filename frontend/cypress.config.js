import { defineConfig } from "cypress";
import viteConfig from "./vite.config.js"; // <-- Add this line

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {},
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig, // <-- Pass Vite config here
    },
    supportFile: "cypress/support/component.js", // <-- Optional but better to be explicit
  },
});
