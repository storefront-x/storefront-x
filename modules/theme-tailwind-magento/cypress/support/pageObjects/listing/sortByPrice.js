export default (order) => {
  cy.get('#sort button').click()

  cy.get(`[data-cy=sort-price-${order}]`).click()

  cy.waitUntil(() =>
    cy.get('[data-cy*=product-price]').then((inputs) => {
      const prices = [...inputs].map((input) => input.attributes['data-cy'].value.split('_val_').pop())

      const sorted = [...prices].sort((a, b) => (order === 'ASC' ? a - b : b - a))

      return prices.join(' ') === sorted.join(' ')
    }),
  )
}
