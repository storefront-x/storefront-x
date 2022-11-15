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
  },

  computed: {
    currentPage() {
      return Number(this.$route.query.page) || 1
    },

    loadedPages() {
      return +this.$route.query.pages || 1
    },

    loadMoreUrl() {
      return '?' + this.getQuery({ pages: this.loadedPages + 1 })
    },

    lastPage() {
      return Math.ceil(this.total / this.perPage)
    },

    canLoadMore() {
      return this.currentPage + this.loadedPages <= this.lastPage
    },
  },

  methods: {
    loadMore() {
      this.pushQuery({ pages: this.loadedPages + 1 }, { savePosition: true })
    },
  },
}
