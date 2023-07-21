import useRoute from '#ioc/composables/useRoute'
import useRouterQuery from '#ioc/composables/useRouterQuery'

import { computed, reactive } from 'vue'

export default (props: { total: number; perPage: number }) => {
  const routerQuery = useRouterQuery()
  const route = useRoute()

  const currentPage = computed(() => {
    return Number(route.query.page) || 1
  })

  const loadedPages = computed(() => {
    return Number(route.query.pages) || 1
  })

  const loadMoreUrl = computed(() => {
    return (
      '?' +
      routerQuery.getQuery({
        page: (route.query.page && Number(route.query.page) + 1) || 2,
        pages: loadedPages.value + 1,
      })
    )
  })

  const lastPage = computed(() => {
    return Math.ceil(props.total / props.perPage)
  })

  const canLoadMore = computed(() => {
    return currentPage.value + loadedPages.value <= lastPage.value
  })

  const load = () => {
    routerQuery.pushQuery(
      { page: (route.query.page && Number(route.query.page) + 1) || 2, pages: loadedPages.value + 1 },
      { savePosition: true },
    )
  }

  return reactive({
    currentPage,
    loadedPages,
    loadMoreUrl,
    lastPage,
    canLoadMore,
    load,
  })
}
