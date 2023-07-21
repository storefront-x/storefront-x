import useRouterQuery from '#ioc/composables/useRouterQuery'
import useRoute from '#ioc/composables/useRoute'
import { computed, reactive } from 'vue'

export default (props: { total: number; perPage: number; extraPages: number }) => {
  const route = useRoute()
  const routerQuery = useRouterQuery()

  const currentPage = computed(() => {
    return Number(route.query.page) || 1
  })

  const nextPage = computed(() => {
    return currentPage.value + 1
  })

  const previousPage = computed(() => {
    return currentPage.value - 1
  })

  const lastLoadedPage = computed(() => {
    return currentPage.value || 1
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

  const isNotFirstOrLastPage = computed(() => {
    return currentPage.value > 1 && currentPage.value < lastPage.value
  })

  const pages = computed(() => {
    const pages = []

    for (let page = leftPages.value; page > 0; page--) {
      pages.push(lastLoadedPage.value - page)
    }

    pages.push(lastLoadedPage.value)

    for (let page = 1; page <= rightPagesTotal.value; page++) {
      pages.push(lastLoadedPage.value + page)
    }

    return pages
  })

  const rightPages = computed(() => {
    const isOnLeft = Math.min(leftPagesTotal.value, props.extraPages)

    return Math.min(rightPagesTotal.value, props.extraPages * 2 - isOnLeft)
  })

  const leftSeparator = computed(() => {
    return leftPagesTotal.value - leftPages.value > 1
  })

  const rightSeparator = computed(() => {
    return rightPagesTotal.value - rightPages.value > 1
  })

  const leftLastItem = computed(() => {
    return leftPagesTotal.value - leftPages.value > 0
  })

  const rightLastItem = computed(() => {
    return rightPagesTotal.value - rightPages.value > 0
  })

  const getUrlFor = (page: string | number) => {
    const pageToSet = Number(page) === 1 ? undefined : page

    return route.path + '?' + routerQuery.getQuery({ page: pageToSet, pages: undefined })
  }

  const isPageVisible = (page: number) => {
    return page < currentPage.value - 2 || page > currentPage.value + 2
  }

  return reactive({
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
    isNotFirstOrLastPage,
    leftPages,
    pages,
    rightPages,
    leftSeparator,
    rightSeparator,
    leftLastItem,
    rightLastItem,
    getUrlFor,
    isPageVisible,
  })
}
