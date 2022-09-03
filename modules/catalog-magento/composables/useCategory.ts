import ToCategory from '#ioc/mappers/ToCategory'
import useCatalogMagentoStore from '#ioc/stores/useCatalogMagentoStore'
import { computed, reactive, Ref } from 'vue'

export default (product: Ref<ReturnType<typeof ToCategory>>) => {
  const catalogMagentoStore = useCatalogMagentoStore()

  const id = computed(() => product.value.id)

  const name = computed(() => product.value.name)

  const urlPath = computed(() => product.value.urlPath + catalogMagentoStore.categoryUrlSuffix)

  const children = computed(() => product.value.children ?? [])

  const thumbnailUrl = computed(() => product.value.thumbnailUrl)

  return reactive({
    id,
    name,
    urlPath,
    children,
    thumbnailUrl,
  })
}
