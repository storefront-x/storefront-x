export default () =>
  cy.get('[data-cy=input-coupon-code]').within(() => {
    cy.get('input')
  })
