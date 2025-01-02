const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://student-temp-app-dev-lb-762622184.us-east-1.elb.amazonaws.com/", // Replace with your app's base URL
    supportFile: false,
  },
});
