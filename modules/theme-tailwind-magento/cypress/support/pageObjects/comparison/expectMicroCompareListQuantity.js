export default (quantity) => cy.get('[data-cy=micro-comparelist-quantity]').should('contain.text', quantity)
