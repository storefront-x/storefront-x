export default () =>
  cy
    .fixture('products.gql')
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
      const products = body.data.products.items

      Cypress.log({
        name: 'GetProducts',
        displayName: 'grsp',
        message: products.length,
      })

      return products
    })
