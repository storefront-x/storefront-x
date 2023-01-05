import getBlogTitle from '~/cypress/support/pageObjects/blogCategory/getBlogTitle'
import getBlogPostTiles from '~/cypress/support/pageObjects/blogCategory/getBlogPostTiles'
import GetRandomBlogCategory from '~/cypress/support/repositories/GetRandomBlogCategory'

describe('Blog category', () => {
  beforeEach(() => {
    GetRandomBlogCategory().as('blogCategory')
    cy.get('@blogCategory').then((blogCategory) => {
      cy.visit('/blog/category/' + blogCategory.url_key).waitForSfx()
    })
  })

  it('renders its name', () => {
    cy.get('@blogCategory').then((blogCategory) => {
      getBlogTitle().will('include.text', () => blogCategory.name)
    })
  })

  it('has blog posts', () => {
    cy.get('@blogCategory').then((blogCategory) => {
      getBlogPostTiles().will('have.length.at.most', () => blogCategory.post_count)
    })
  })
})
