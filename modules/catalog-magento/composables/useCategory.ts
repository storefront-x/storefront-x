import useToCategory from '#ioc/mappers/useToCategory'
import useCatalogMagentoStore from '#ioc/stores/useCatalogMagentoStore'
import { computed, reactive, Ref } from 'vue'

export default (product: Ref<ReturnType<ReturnType<typeof useToCategory>>>) => {
  const catalogMagentoStore = useCatalogMagentoStore()

  const id = computed(() => product.value.id)

  const name = computed(() => product.value.name)

  const urlPath = computed(() => product.value.urlPath + catalogMagentoStore.categoryUrlSuffix)

  return reactive({
    id,
    name,
    urlPath,
  })
}
