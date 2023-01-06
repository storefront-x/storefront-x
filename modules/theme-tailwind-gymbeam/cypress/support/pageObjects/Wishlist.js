export default class Wishlist {
  expectWishlistQuantity(quantity) {
    return cy.get('[data-cy=product-title]').should('have.length', quantity)
  }
}
