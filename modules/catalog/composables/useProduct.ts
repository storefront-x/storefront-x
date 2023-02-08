import ToProduct from '#ioc/mappers/ToProduct'
import { computed, reactive, Ref } from 'vue'

export default (product: Ref<ReturnType<typeof ToProduct>>) => {
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

  const meta = computed(() => product.value.meta)

  const crossSellProducts = computed(() => product.value.crossSellProducts)

  const relatedProducts = computed(() => product.value.relatedProducts)

  const isOnSale = computed(() => finalPrice.value.value < regularPrice.value.value)

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
    meta,
    crossSellProducts,
    relatedProducts,
  })
}
