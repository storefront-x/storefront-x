import GetRandomCategory from '~/cypress/support/repositories/GetRandomCategory'

export default function visitRandom(options) {
  return GetRandomCategory(options).then((category) => {
    return cy.visit(category.url_key + category.url_suffix).waitForSfx()
  })
}
