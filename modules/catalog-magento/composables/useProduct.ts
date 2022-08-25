import useToProduct from '#ioc/mappers/useToProduct'
import useCatalogMagentoStore from '#ioc/stores/useCatalogMagentoStore'
import { computed, reactive, Ref } from 'vue'

export default (product: Ref<ReturnType<ReturnType<typeof useToProduct>>>) => {
  const catalogMagentoStore = useCatalogMagentoStore()

  const id = computed(() => product.value.id)

  const sku = computed(() => product.value.sku)

  const name = computed(() => product.value.name)

  const urlKey = computed(() => product.value.urlKey)

  const urlPath = computed(() => '/' + urlKey.value + catalogMagentoStore.productUrlSuffix)

  const description = computed(() => product.value.description)

  const shortDescriptionHtml = computed(() => product.value.shortDescriptionHtml)

  const thumbnailUrl = computed(() => product.value.thumbnailUrl)

  const regularPrice = computed(() => product.value.regularPrice)

  const finalPrice = computed(() => product.value.finalPrice)

  const breadcrumbs = computed(() => product.value.breadcrumbs)

  const available = computed(() => product.value.available)

  const isOnSale = computed(() => finalPrice.value < regularPrice.value)

  const images = computed(() => product.value.images ?? [])

  const crossSellProducts = computed(() => product.value.crossSellProducts)

  const upsellProducts = computed(() => product.value.upsellProducts)

  const meta = computed(() => product.value.meta)

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
    upsellProducts,
  })
}
