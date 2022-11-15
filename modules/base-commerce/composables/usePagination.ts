import { computed, ComputedRef } from 'vue'
import useQueryRouter from '#ioc/composables/useQueryRouter'
import useRoute from '#ioc/composables/useRoute'

export default (props: any) => {
  const queryRouter = useQueryRouter()
  const route = useRoute()

  const currentPage = computed(() => {
    return Number(route.query.page) || 1
  })

  const nextPage = computed(() => {
    return currentPage.value + (Number(route.query.pages) || 1)
  })

  const previousPage = computed(() => {
    return currentPage.value - (Number(route.query.pages) || 1)
  })

  const lastLoadedPage = computed(() => {
    return currentPage.value + ((Number(route.query.pages) || 1) - 1)
  })

  const firstPage = computed(() => {
    return 1
  })

  const isOnFirstPage = computed(() => {
    return lastLoadedPage.value === firstPage.value
  })

  const lastPage = computed(() => {
    return Math.ceil(props.total / props.perPage)
  })

  const isOnLastPage = computed(() => {
    return lastLoadedPage.value === lastPage.value
  })

  const leftPagesTotal = computed(() => {
    return lastLoadedPage.value - firstPage.value
  })

  const rightPagesTotal = computed(() => {
    return lastPage.value - lastLoadedPage.value
  })

  const leftPages = computed(() => {
    const isOnRight = Math.min(rightPagesTotal.value, props.extraPages)

    return Math.min(leftPagesTotal.value, props.extraPages * 2 - isOnRight)
  })

  const rightPages = computed(() => {
    const isOnLeft = Math.min(leftPagesTotal.value, props.extraPages)

    return Math.min(rightPagesTotal.value, props.extraPages * 2 - isOnLeft)
  })

  const pages = computed(() => {
    const pages = []

    for (let page = leftPages.value; page > 0; page--) {
      pages.push(lastLoadedPage.value - page)
    }

    pages.push(lastLoadedPage.value)

    for (let page = 1; page <= rightPages.value; page++) {
      pages.push(lastLoadedPage.value + page)
    }

    return pages
  })

  const leftSeparator = computed(() => {
    return leftPagesTotal.value - leftPages.value > 1
  })

  const rightSeparator = computed(() => {
    return rightPagesTotal.value - rightPages.value > 1
  })

  /* Simply return Boolean, true only if we should render left last item (1) due to advance in paging */
  const leftLastItem = computed(() => {
    return leftPagesTotal.value - leftPages.value > 0
  })
  /* Simply return Boolean, true only if we should render right last item (highest page) due to advance in paging */
  const rightLastItem = computed(() => {
    return rightPagesTotal.value - rightPages.value > 0
  })

  function getUrlFor(page: number | ComputedRef<number>) {
    let newPage
    if (typeof page === 'number') {
      newPage = Number(page)
    } else {
      newPage = Number(page.value)
    }

    return route.path + '?' + queryRouter.getQuery({ page: newPage, pages: undefined })
  }

  return {
    currentPage,
    nextPage,
    previousPage,
    lastLoadedPage,
    firstPage,
    isOnFirstPage,
    lastPage,
    isOnLastPage,
    leftPagesTotal,
    rightPagesTotal,
    leftPages,
    rightPages,
    pages,
    leftSeparator,
    rightSeparator,
    leftLastItem,
    rightLastItem,
    getUrlFor,
  }
}
