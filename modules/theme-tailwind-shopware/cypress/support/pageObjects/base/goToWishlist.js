export default function gotoWishlist() {
  return cy.get('[data-cy=micro-wishlist]').click()
}
