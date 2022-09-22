import { randomFrom } from '../utils'

export default ({ minProducts = 1 } = {}) =>
  cy
    .fixture('categories.gql')
    .then((query) =>
      cy.request({
        method: 'POST',
        url: Cypress.env('GRAPHQL_URL'),
        headers: {
          Store: Cypress.env('STORE'),
        },
        body: {
          query,
        },
      }),
    )
    .then(({ body }) => {
      const categories = body.data.categories.items.filter((category) => {
        return category.products.total_count >= minProducts
      })

      const category = randomFrom(categories)

      Cypress.log({
        name: 'GetRandomCategory',
        displayName: 'grc',
        message: category.name,
      })

      return category
    })
