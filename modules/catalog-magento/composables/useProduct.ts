import ToProduct from '#ioc/mappers/ToProduct'
import useCatalogMagentoStore from '#ioc/stores/useCatalogMagentoStore'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import isNullish from '#ioc/utils/isNullish'
import { computed, reactive, Ref, ref } from 'vue'

export default (product: Ref<ReturnType<typeof ToProduct>>) => {
  const catalogMagentoStore = useCatalogMagentoStore()

  const bundle = ref({} as any)

  const configuration = ref({} as any)

  const options = ref({} as string[])

  const id = computed(() => product.value.id)

  const sku = computed(() => product.value.sku)

  const name = computed(() => product.value.name)

  const categories = computed(() => product.value.categories)

  const urlKey = computed(() => product.value.urlKey)

  const urlPath = computed(() => '/' + urlKey.value + catalogMagentoStore.productUrlSuffix)

  const descriptionHtml = computed(() => product.value.descriptionHtml)

  const shortDescriptionHtml = computed(() => product.value.shortDescriptionHtml)

  const thumbnailUrl = computed(() => variant.value.thumbnaulUrl ?? product.value.thumbnailUrl)

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

  const isGroupedProduct = computed(() => product.value.__typename === 'GroupedProduct')

  const isBundleConfigured = computed(() => isNonEmptyObject(bundle.value))

  const mediaGallery = computed(() => {
    if (variant.value?.mediaGallery?.length > 0) {
      return variant.value?.mediaGallery
    }
    return product.value.mediaGallery || []
  })

  const bundleItems = computed(() => product.value.bundleItems || [])

  const configurableOptions = computed(() => product.value.configurableOptions ?? [])

  const variants = computed(() => product.value.variants ?? [])

  const variant = computed(() => {
    if (!Object.keys(configuration.value).length) return {}

    out: for (const { attributes, product } of variants.value) {
      for (const [key, value] of Object.entries(attributes)) {
        if (configuration.value[key] !== value) {
          continue out
        }
      }
      return product
    }

    return {}
  })

  const productOptions = computed(() => product.value.options ?? [])

  const isOptionsConfigured = computed(() => isNonEmptyObject(options.value))

  const isConfigured = computed(() => !isNullish(variant.value.sku))

  const groupedItems = computed(() => product.value.groupedItems ?? [])

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
    configuration,
    variant,
    productOptions,
    options,
    isConfigured,
    isBundleConfigured,
    isOptionsConfigured,
    groupedItems,
    isGroupedProduct,
  })
}
