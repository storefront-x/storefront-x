import 'cypress-wait-until'

Cypress.Commands.add('waitForSfx', { prevSubject: 'optional' }, () => {
  return cy.waitUntil(() => {
    return cy.window().its('sfx').should('be.true')
  })
})
