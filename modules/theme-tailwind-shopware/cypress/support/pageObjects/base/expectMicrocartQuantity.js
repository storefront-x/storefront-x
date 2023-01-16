export default (quantity) => cy.get('[data-cy=microcart-quantity]').should('contain.text', quantity)
