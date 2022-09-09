import ToProduct from '#ioc/mappers/ToProduct'
import useCatalogMagentoStore from '#ioc/stores/useCatalogMagentoStore'
import { computed, reactive, Ref, ref } from 'vue'

export default (product: Ref<ReturnType<typeof ToProduct>>) => {
  const catalogMagentoStore = useCatalogMagentoStore()

  const bundle = ref({} as any)

  const configurations = ref({} as any)

  const id = computed(() => product.value.id)

  const sku = computed(() => product.value.sku)

  const name = computed(() => product.value.name)

  const categories = computed(() => product.value.categories)

  const urlKey = computed(() => product.value.urlKey)

  const urlPath = computed(() => '/' + urlKey.value + catalogMagentoStore.productUrlSuffix)

  const descriptionHtml = computed(() => product.value.descriptionHtml)

  const shortDescriptionHtml = computed(() => product.value.shortDescriptionHtml)

  const thumbnailUrl = computed(() => product.value.thumbnailUrl)

  const regularPrice = computed(() => product.value.regularPrice)

  const finalPrice = computed(() => product.value.finalPrice)

  const minimumPrice = computed(() => product.value.minimumPrice)

  const breadcrumbs = computed(() => [
    ...product.value.categories.map((category: any) => ({
      title: category.name,
      link: category.url_path + '.html',
    })),
  ])

  const available = computed(() => product.value.available)

  const isOnSale = computed(() => finalPrice.value.value < regularPrice.value.value)

  const images = computed(() => product.value.images ?? [])

  const crossSellProducts = computed(() => product.value.crossSellProducts)

  const upsellProducts = computed(() => product.value.upsellProducts)

  const meta = computed(() => product.value.meta)

  const ratingSummary = computed(() => product.value.ratingSummary)

  const reviewCount = computed(() => product.value.reviewCount)

  const reviews = computed(() => product.value.reviews ?? [])

  const isSimpleProduct = computed(() => product.value.__typename === 'SimpleProduct')

  const isConfigurableProduct = computed(() => product.value.__typename === 'ConfigurableProduct')

  const isBundleProduct = computed(() => product.value.__typename === 'BundleProduct')

  const mediaGallery = computed(() => product.value.mediaGallery || [])

  const bundleItems = computed(() => product.value.bundleItems || [])

  const configurableOptions = computed(() => {
    return configurations.value.configurableOptions ?? product.value.configurableOptions ?? []
  })

  return reactive({
    id,
    sku,
    name,
    categories,
    urlKey,
    urlPath,
    descriptionHtml,
    shortDescriptionHtml,
    thumbnailUrl,
    regularPrice,
    finalPrice,
    breadcrumbs,
    available,
    isOnSale,
    images,
    meta,
    ratingSummary,
    reviewCount,
    reviews,
    isSimpleProduct,
    isConfigurableProduct,
    isBundleProduct,
    mediaGallery,
    crossSellProducts,
    upsellProducts,
    bundleItems,
    minimumPrice,
    bundle,
    configurableOptions,
  })
}
