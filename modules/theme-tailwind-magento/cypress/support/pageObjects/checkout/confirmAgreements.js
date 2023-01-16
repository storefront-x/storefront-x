export default () => cy.get('[data-cy=checkout-agreements] input[type=checkbox]').click({ multiple: true })
