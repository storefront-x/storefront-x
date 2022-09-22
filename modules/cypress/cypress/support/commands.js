import 'cypress-wait-until'

Cypress.Commands.add('will', { prevSubject: 'element' }, (subject, chainers, value) => {
  return cy
    .wrap(subject)
    .then((subject) => cy.wrap(subject).should(chainers, typeof value === 'function' ? value() : value))
})

Cypress.Commands.add('waitForSfx', { prevSubject: 'optional' }, () => {
  return cy.waitUntil(() => {
    return cy.window().its('sfx').should('be.true')
  })
})

Cypress.Commands.add('withinIframe', (locator) => {
  return cy.get(locator).its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
})
