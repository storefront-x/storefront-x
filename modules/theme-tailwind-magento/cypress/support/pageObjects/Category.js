import GetRandomCategory from '~/cypress/support/repositories/GetRandomCategory'

export default class Category {
  constructor() {
    this.data = null
  }

  visitRandom(options) {
    return GetRandomCategory(options).then((category) => {
      this.data = category

      return cy.visit(category.url_key + category.url_suffix).waitForSfx()
    })
  }

  getTitle() {
    return cy.get('[data-cy=title]')
  }

  getNumberOfProductsInCategory() {
    return cy.get('[data-cy=title]')
  }
}
