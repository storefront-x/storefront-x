import useToProduct from '#ioc/mappers/useToProduct'
import { computed, reactive, Ref } from 'vue'

export default (product: Ref<ReturnType<ReturnType<typeof useToProduct>>>) => {
  const id = computed(() => product.value.id)

  const sku = computed(() => product.value.sku)

  const name = computed(() => product.value.name)

  const urlKey = computed(() => product.value.urlKey)

  const urlPath = computed(() => product.value.urlPath)

  const description = computed(() => product.value.description)

  const shortDescriptionHtml = computed(() => product.value.shortDescriptionHtml)

  const thumbnailUrl = computed(() => product.value.thumbnailUrl)

  const regularPrice = computed(() => product.value.regularPrice)

  const finalPrice = computed(() => product.value.finalPrice)

  const breadcrumbs = computed(() => product.value.breadcrumbs)

  const available = computed(() => product.value.available)

  const images = computed(() => product.value.images)

  const metaData = computed(() => product.value.metaData)

  const isOnSale = computed(() => finalPrice.value < regularPrice.value)

  return reactive({
    id,
    sku,
    name,
    urlKey,
    urlPath,
    description,
    shortDescriptionHtml,
    thumbnailUrl,
    regularPrice,
    finalPrice,
    breadcrumbs,
    available,
    isOnSale,
    images,
    metaData,
  })
}
