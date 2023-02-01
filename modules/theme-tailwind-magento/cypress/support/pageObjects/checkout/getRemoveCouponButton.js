export default (position) => cy.get('[data-cy=button-remove-coupon]').eq(position ?? 1)
