export default (quantity) => cy.get('[data-cy=product-title]').should('have.length', quantity)
