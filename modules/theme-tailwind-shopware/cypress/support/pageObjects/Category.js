export default class Category {
  constructor() {
    this.name = null
  }

  visit(category) {
    this.name = category
    return cy.visit(category).waitForSfx()
  }

  getTitle() {
    return cy.get('[data-cy=title]')
  }
}
