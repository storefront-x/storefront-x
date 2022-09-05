import ToCategory from '#ioc/mappers/ToCategory'
import useCatalogMagentoStore from '#ioc/stores/useCatalogMagentoStore'
import { computed, reactive, Ref } from 'vue'

export default (category: Ref<ReturnType<typeof ToCategory>>) => {
  const catalogMagentoStore = useCatalogMagentoStore()

  const id = computed(() => category.value.id)

  const name = computed(() => category.value.name)

  const urlPath = computed(() => '/' + category.value.urlKey + catalogMagentoStore.categoryUrlSuffix)

  const children = computed(() => category.value.children ?? [])

  const thumbnailUrl = computed(() => category.value.thumbnailUrl)

  const breadcrumbs = computed(() =>
    category.value.breadcrumbs.map((breadcrumb: any) => {
      return {
        title: breadcrumb.title,
        link: breadcrumb.link + '.html',
      }
    }),
  )

  return reactive({
    id,
    name,
    urlPath,
    children,
    thumbnailUrl,
    breadcrumbs,
  })
}
