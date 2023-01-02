export default function getAddToWishlist() {
  return cy.get('[data-cy=add-to-wishlist]').first()
}
