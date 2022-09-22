import BlogCategory from '#cypress/support/pageObjects/BlogCategory'

describe('Blog category', () => {
  /** @type {BlogCategory} */
  let blogCategory = null

  beforeEach(() => {
    blogCategory = new BlogCategory()

    blogCategory.visitRandom()
  })

  it('renders its name', () => {
    blogCategory.getTitle().will('include.text', () => blogCategory.data.name)
  })

  it('has blog posts', () => {
    blogCategory.getBlogPostTiles().will('have.length.at.most', () => blogCategory.data.post_count)
  })
})
