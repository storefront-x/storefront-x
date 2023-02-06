export default (position) => cy.get('[data-cy=button-remove-coupon]:visible').eq(position ?? 0)
