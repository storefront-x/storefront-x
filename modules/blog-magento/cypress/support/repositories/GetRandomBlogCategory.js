import { randomFrom } from '../utils'

export default () =>
  cy
    .fixture('amBlogCategories.gql')
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
      const blogCategories = body.data.amBlogCategories.items
      const blogCategory = randomFrom(blogCategories)

      Cypress.log({
        name: 'GetRandomBlogCategory',
        displayName: 'grbc',
        message: blogCategory.name,
      })

      return blogCategory
    })
