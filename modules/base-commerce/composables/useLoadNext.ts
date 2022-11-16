import { computed } from 'vue'
import useQueryRouter from '#ioc/composables/useQueryRouter'
import useRoute from '#ioc/composables/useRoute'

export default (props: any) => {
  const queryRouter = useQueryRouter()
  const route = useRoute()

  const currentPage = computed(() => {
    return Number(route.query.page) || 1
  })

  const loadedPages = computed(() => {
    return +route.query.pages || 1
  })

  const loadMoreUrl = computed(() => {
    return '?' + queryRouter.getQuery({ pages: loadedPages.value + 1 })
  })

  const lastPage = computed(() => {
    return Math.ceil(props.total / props.perPage)
  })

  const canLoadMore = computed(() => {
    return currentPage.value + loadedPages.value <= lastPage.value
  })

  function loadMore() {
    queryRouter.pushQuery({ pages: loadedPages.value + 1 }, { savePosition: true })
  }
  return { currentPage, loadedPages, loadMoreUrl, lastPage, canLoadMore, loadMore }
}
