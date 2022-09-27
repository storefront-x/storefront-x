import 'cypress-wait-until'

// @ts-ignore
Cypress.Commands.add('waitForSfx', { prevSubject: 'optional' }, () => {
  return cy.waitUntil(() => {
    return cy.window().its('sfxCypressMounted').should('be.true')
  })
})
