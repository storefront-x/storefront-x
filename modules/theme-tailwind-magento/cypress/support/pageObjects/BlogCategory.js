import GetRandomBlogCategory from '~/cypress/support/repositories/GetRandomBlogCategory'

export default class BlogCategory {
  constructor() {
    this.data = null
  }

  visitRandom() {
    return GetRandomBlogCategory().then((blogCategory) => {
      this.data = blogCategory

      return cy.visit('/blog/category/' + blogCategory.url_key).waitForSfx()
    })
  }

  getTitle() {
    return cy.get('[data-cy=title]')
  }

  getBlogPostTiles() {
    return cy.get('[data-cy=blog-post-tile]')
  }
}
