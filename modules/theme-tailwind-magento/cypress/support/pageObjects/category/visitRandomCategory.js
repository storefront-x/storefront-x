import GetRandomCategory from '~/cypress/support/repositories/GetRandomCategory'

export default (options) => {
  return GetRandomCategory(options)
    .as('randomCategory')
    .then((category) => {
      return cy.visit(category.url_key + category.url_suffix).waitForSfx()
    })
}
