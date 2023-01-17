export default (quantity) => cy.get('[data-cy=micro-wishlist-quantity]').should('contain.text', quantity)
