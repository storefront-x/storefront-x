export default class Listing {
  sortByPrice(order) {
    cy.get('#sort button').click()

    cy.get(`[data-cy=sort-price-${order}]`).click()

    cy.waitUntil(() =>
      cy.get('[data-cy=product-price]').then((inputs) => {
        const prices = [...inputs].map((input) => parseFloat(input.textContent.replace(/\s+/g, '')))

        const sorted = [...prices].sort((a, b) => (order === 'ASC' ? a - b : b - a))

        return prices.join(' ') === sorted.join(' ')
      }),
    )
  }

  loadMore() {
    cy.get('[data-cy=product-title]')
      .last()
      .invoke('text')
      .then((before) => {
        cy.get('[data-cy=load-more]').click()
        cy.waitUntil(() =>
          cy
            .get('[data-cy=product-title]')
            .last()
            .invoke('text')
            .then((after) => before !== after),
        )
      })
  }

  filter() {
    cy.get('[data-cy=product-title]')
      .invoke('text')
      .then((before) => {
        cy.get('[data-cy=filter-option]').last().click()

        cy.waitUntil(() =>
          cy
            .get('[data-cy=product-title]')
            .invoke('text')
            .then((after) => before !== after),
        )
      })
  }

  getFirstAddToCart({ product } = {}) {
    const base = '[data-cy=add-to-cart]'

    if (product === 'simple') {
      return cy.get(`${base}[data-simple-product=true]`).first()
    } else {
      return cy.get(base).first()
    }
  }
}
