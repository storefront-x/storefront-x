import ToCategory from '#ioc/mappers/ToCategory'
import { computed, reactive, Ref } from 'vue'
import useCatalogMagentoStore from '#ioc/stores/useCatalogMagentoStore'

export default (category: Ref<ReturnType<typeof ToCategory>>) => {
  const catalogMagentoStore = useCatalogMagentoStore()

  const id = computed(() => category.value.id)

  const name = computed(() => category.value.name)

  const description = computed(() => category.value.description)

  const urlPath = computed(() => '/' + category.value.urlPath + category.value.urlSuffix)

  const children = computed(() => category.value.children ?? [])

  const thumbnailUrl = computed(() => category.value.thumbnailUrl)

  const imageUrl = computed(() => category.value.imageUrl ?? '')

  const breadcrumbs = computed(() =>
    category.value.breadcrumbs.map((breadcrumb: any) => {
      return {
        title: breadcrumb.title,
        link: breadcrumb.link + catalogMagentoStore.categoryUrlSuffix,
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
    description,
    imageUrl,
  })
}
