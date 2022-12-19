export default function expectMicrowishlistQuantity(quantity) {
  return cy.get('[data-cy=micro-wishlist-quantity]').should('contain.text', quantity)
}
