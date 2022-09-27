import 'cypress-wait-until'

Cypress.Commands.add('withinIframe', (locator) => {
  return cy.get(locator).its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
})
