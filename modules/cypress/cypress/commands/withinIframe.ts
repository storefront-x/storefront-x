import 'cypress-wait-until'

// @ts-ignore
Cypress.Commands.add('withinIframe', (locator) => {
  // @ts-ignore
  return cy.get(locator).its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
})
