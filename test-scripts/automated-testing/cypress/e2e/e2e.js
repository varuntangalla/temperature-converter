// cypress/support/e2e.js
// This file is processed and loaded automatically before your test files.
// Use this space to include global configurations or behaviors.

Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from failing the test.
    return false;
  });
  