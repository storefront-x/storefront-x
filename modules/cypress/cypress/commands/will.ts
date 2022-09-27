import 'cypress-wait-until'

// @ts-ignore
Cypress.Commands.add('will', { prevSubject: 'element' }, (subject, chainers, value) => {
  return cy
    .wrap(subject)
    .then((subject) => cy.wrap(subject).should(chainers, typeof value === 'function' ? value() : value))
})
