import UsesRouter from '#ioc/mixins/UsesRouter'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'

export default {
  mixins: [UsesRouter],

  props: {
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    perPage: {
      type: Number,
      required: false,
      default: CATALOG_PAGE_SIZE,
    },
    extraPages: {
      type: Number,
      required: false,
      default: 2,
    },
  },

  computed: {
    currentPage() {
      return Number(this.$route.query.page) || 1
    },

    nextPage() {
      return this.currentPage + (Number(this.$route.query.pages) || 1)
    },

    previousPage() {
      return this.currentPage - (Number(this.$route.query.pages) || 1)
    },

    lastLoadedPage() {
      return this.currentPage + ((Number(this.$route.query.pages) || 1) - 1)
    },

    firstPage() {
      return 1
    },

    isOnFirstPage() {
      return this.lastLoadedPage === this.firstPage
    },

    lastPage() {
      return Math.ceil(this.total / this.perPage)
    },

    isOnLastPage() {
      return this.lastLoadedPage === this.lastPage
    },

    leftPagesTotal() {
      return this.lastLoadedPage - this.firstPage
    },

    rightPagesTotal() {
      return this.lastPage - this.lastLoadedPage
    },

    leftPages() {
      const isOnRight = Math.min(this.rightPagesTotal, this.extraPages)

      return Math.min(this.leftPagesTotal, this.extraPages * 2 - isOnRight)
    },

    pages() {
      const pages = []

      for (let page = this.leftPages; page > 0; page--) {
        pages.push(this.lastLoadedPage - page)
      }

      pages.push(this.lastLoadedPage)

      for (let page = 1; page <= this.rightPages; page++) {
        pages.push(this.lastLoadedPage + page)
      }

      return pages
    },

    rightPages() {
      const isOnLeft = Math.min(this.leftPagesTotal, this.extraPages)

      return Math.min(this.rightPagesTotal, this.extraPages * 2 - isOnLeft)
    },

    leftSeparator() {
      return this.leftPagesTotal - this.leftPages > 1
    },

    rightSeparator() {
      return this.rightPagesTotal - this.rightPages > 1
    },

    /* Simply return Boolean, true only if we should render left last item (1) due to advance in paging */
    leftLastItem() {
      return this.leftPagesTotal - this.leftPages > 0
    },

    /* Simply return Boolean, true only if we should render right last item (highest page) due to advance in paging */
    rightLastItem() {
      return this.rightPagesTotal - this.rightPages > 0
    },
  },

  methods: {
    getUrlFor(page) {
      page = Number(page) === 1 ? undefined : page

      return this.$route.path + '?' + this.getQuery({ page, pages: undefined })
    },
  },
}
