import ToProduct from '#ioc/mappers/ToProduct'
import isDeepEqual from '#ioc/utils/isDeepEqual'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import isNullish from '#ioc/utils/isNullish'
import { computed, reactive, Ref, ref } from 'vue'

export default (product: Ref<ReturnType<typeof ToProduct>>) => {
  const bundle = ref({} as any)

  const configuration = reactive({} as any)

  const options = ref({} as string[])

  const productType = computed(() => product.value.__typename)

  const id = computed(() => product.value.id)

  const sku = computed(() => product.value.sku)

  const name = computed(() => product.value.name)

  const categories = computed(() => product.value.categories)

  const urlKey = computed(() => product.value.urlKey)

  const urlPath = computed(() => '/' + urlKey.value + product.value.urlSuffix)

  const descriptionHtml = computed(() => product.value.descriptionHtml)

  const shortDescriptionHtml = computed(() => product.value.shortDescriptionHtml)

  const thumbnailUrl = computed(() => variant.value.thumbnailUrl ?? product.value.thumbnailUrl)

  const regularPrice = computed(() => variant.value.regularPrice ?? product.value.regularPrice)

  const finalPrice = computed(() => variant.value.finalPrice ?? product.value.finalPrice)

  const minimumPrice = computed(() => product.value.minimumPrice)

  const maximumPrice = computed(() => product.value.maximumPrice)

  const breadcrumbs = computed(() => [
    ...product.value.categories.map((category: any) => ({
      title: category.name,
      link: category.urlPath + category.urlSuffix,
    })),
  ])

  const available = computed(() => product.value.available)

  const isOnSale = computed(() => finalPrice.value.value < regularPrice.value.value)

  const images = computed(() => product.value.images ?? [])

  const relatedProducts = computed(() => product.value.relatedProducts)

  const crossSellProducts = computed(() => product.value.crossSellProducts)

  const upsellProducts = computed(() => product.value.upsellProducts)

  const meta = computed(() => product.value.meta)

  const ratingSummary = computed(() => product.value.ratingSummary)

  const reviewCount = computed(() => product.value.reviewCount)

  const reviews = computed(() => product.value.reviews ?? [])

  const isSimpleProduct = computed(() => productType.value === 'SimpleProduct')

  const isOptionsProduct = computed(() => 'options' in product.value && !!product.value.options)

  const isConfigurableProduct = computed(() => productType.value === 'ConfigurableProduct')

  const isBundleProduct = computed(() => productType.value === 'BundleProduct')

  const isGroupedProduct = computed(() => productType.value === 'GroupedProduct')

  const isBundleConfigured = computed(() => {
    if (isBundleProduct.value) {
      if (bundleItems.value.length === 0) {
        return false
      }
      for (const item of bundleItems.value) {
        if (item.required && !bundle.value[item.id]) {
          return false
        }
      }
      return true
    }
    return false
  })

  const bundleConfigurationErrors = computed(() => {
    const errors = []

    for (const item of bundleItems.value) {
      if (item.required && !bundle.value[item.id]) {
        errors.push(item.title)
      }
    }
    return errors
  })

  const mediaGallery = computed(() => {
    if (variant.value?.mediaGallery?.length > 0) {
      return [...variant.value.mediaGallery, ...product.value.mediaGallery]
    }
    return product.value.mediaGallery || []
  })

  const bundleItems = computed(() => product.value.bundleItems || [])

  const configurableOptions = computed(() => {
    const newOptions = []
    const allConfigurableOptions = product.value.configurableOptions ?? []

    if (allConfigurableOptions.length) {
      for (const option of allConfigurableOptions) {
        newOptions.push({ ...option, values: availableVariants(option.values, option.attributeCode) })
      }
      return newOptions
    } else {
      return allConfigurableOptions
    }
  })

  const variants = computed(() => product.value.variants ?? [])

  const availableVariants = (values: any, optionKey: string) => {
    const configurationKeys = Object.keys(configuration)

    const newValues = []
    let filteredVariants = []

    for (const variant of variants.value) {
      if (variant.product.available) {
        filteredVariants.push(variant)
      }
    }

    if (configurationKeys.length > 0) {
      for (const key of configurationKeys) {
        if (key !== optionKey) {
          filteredVariants = filteredVariants.filter((item: any) => item.attributes[key] === configuration[key])
        }
      }
    }

    for (const value of values) {
      let isAvailable = false
      for (const filteredVariant of filteredVariants) {
        if (filteredVariant.attributes[optionKey] === value.index) {
          isAvailable = true
          break
        }
      }
      if (isAvailable) {
        newValues.push({ ...value, disabled: false })
      } else {
        newValues.push({ ...value, disabled: true })
      }
    }

    return newValues
  }

  const variant = computed(() => {
    for (const { attributes, product } of variants.value) {
      if (isDeepEqual(attributes, configuration)) {
        return product
      }
    }

    return {}
  })

  const productOptions = computed(() => product.value.options ?? [])

  const isOptionsConfigured = computed(() => isNonEmptyObject(options.value))

  const isConfigured = computed(() => !isNullish(variant.value.sku))

  const groupedItems = computed(() => product.value.groupedItems ?? [])

  const isPriceViewRange = computed(() => {
    if (isBundleProduct.value) {
      return product.value.priceView === 'PRICE_RANGE'
    }
    return false
  })

  const isPriceViewAsLowAs = computed(() => {
    if (isBundleProduct.value) {
      return product.value.priceView === 'AS_LOW_AS'
    }
    return false
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
    isPriceViewAsLowAs,
    isPriceViewRange,
    minimumPrice,
    maximumPrice,
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
    isOptionsProduct,
    mediaGallery,
    relatedProducts,
    crossSellProducts,
    upsellProducts,
    bundleItems,
    bundle,
    configurableOptions,
    configuration,
    variant,
    productOptions,
    options,
    isConfigured,
    isBundleConfigured,
    isOptionsConfigured,
    bundleConfigurationErrors,
    groupedItems,
    isGroupedProduct,
    productType,
  })
}
