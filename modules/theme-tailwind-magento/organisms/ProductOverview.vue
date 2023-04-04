<template>
  <div id="productOverview" class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start relative">
    <div class="flex flex-col">
      <ProductGallery />
    </div>

    <div class="absolute top-2 left-0 pointer-events-none gap-2 p-3 space-y-1">
      <ProductLabel v-for="(label, i) in product.labels" :key="i" :label="label" />
    </div>

    <div class="mt-10 sm:px-0 sm:mt-16 lg:mt-0">
      <Heading :level="1" data-cy="title">{{ product.name }}</Heading>
      <ReviewStars class="mt-2" :rating="product.ratingSummary" :count="product.reviewCount" />

      <div v-if="product.productOptions.length" class="mt-3">
        <h2 class="sr-only">Product options</h2>

        <ProductOptions />
      </div>

      <div v-if="product.isConfigurableProduct" class="mt-3">
        <h2 class="sr-only">Product configurations</h2>

        <ProductConfigurableOptions />
      </div>

      <div class="mt-4">
        <h3 class="sr-only">Description</h3>
        <div class="links" v-html="product.shortDescriptionHtml" />
      </div>

      <StockIndicator :stock-status="product.available" />

      <div class="flex flex-wrap">
        <h2 class="sr-only">{{ t('Product information') }}</h2>
        <template v-if="product.isBundleProduct">
          <ProductBundlePrice
            :classes="`text-3xl text-gray-900 font-bold mr-2`"
            class="mt-2"
            :label-classes="`-mt-1 mr-1`"
          />
          <Button
            color="primary"
            class="w-full sm:w-auto sm:h-auto mt-4 sm:mt-0 sm:ml-3 text-bold"
            :class="product.available || 'opacity-50 pointer-events-none'"
            @click="openAndScrollToBundleConfiguration()"
          >
            <slot>{{ t('configureAndAdd') }}</slot>
          </Button>
        </template>
        <template v-else>
          <div class="mt-0 mr-4 sm:mr-16">
            <div>
              <SfxMoney
                :money="product.finalPrice"
                class="text-3xl text-black font-bold"
                :class="discounted"
                data-cy="product-price"
              />
            </div>

            <div v-if="product.isOnSale" class="mt-1">
              <SfxMoney :money="product.regularPrice" class="line-through text-slate-400" data-cy="product-price" />
            </div>
          </div>

          <ProductQuantityConfigurator @input="onQuantityChange" />

          <AddToCart :quantity="quantity" />
        </template>
      </div>

      <GroupedItems v-if="product.groupedItems.length && product.isGroupedProduct" />

      <GiftPanel />

      <div class="flex">
        <AddToWishlist :title="t('Add')" />
        <FacebookShare />
        <AddToComparison :title="t('Compare')" />
      </div>
      <div class="w-full flex mt-4 text-gray-400">
        <p class="mr-1">{{ t('Warranty: 24 months') }} |</p>
        <p>SKU: {{ product.sku }}</p>
      </div>
    </div>
  </div>
  <div id="bundleConfiguration" class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start relative mt-16">
    <template v-if="product.isBundleProduct && isConfigurationOpen">
      <div class="flex flex-col">
        <h2 class="sr-only">Product bundles</h2>
        <h2 class="my-4">{{ `${t('configure')} ${product.name}` }}</h2>
        <Button
          v-if="isConfigurationOpen"
          color="primary"
          class="max-w-fit my-4 sm:mt-0 text-bold"
          @click="closeAndScrollToProductOverview()"
        >
          <slot>{{ t('goBackToProductDetails') }}</slot>
        </Button>
        <ProductBundleOptions />
      </div>
      <div class="flex flex-col mt-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <h2 class="sr-only">Your configuration</h2>
        <h2 class="my-4">{{ t('yourConfiguration') }}</h2>
        <SfxImage
          :src="product.thumbnailUrl"
          :width="200"
          :height="200"
          :alt="product.name"
          fit="contain"
          class-img="object-center object-contain pr-4 sm:pr-0"
        />
        <h3 class="my-4">{{ product.name }}</h3>
        <StockIndicator :stock-status="product.available" />
        <div class="flex">
          <div class="mt-0 mr-4 sm:mr-16">
            <h2 class="sr-only">{{ t('Product information') }}</h2>
            <SfxMoney :money="product.finalPrice" class="text-3xl text-black font-bold" data-cy="product-price" />
          </div>

          <ProductQuantityConfigurator @input="onQuantityChange" />
          <AddToCart :quantity="quantity" />
        </div>
        <div class="flex flex-col">
          <p v-for="(error, index) in product.bundleConfigurationErrors" :key="index" class="text-sm text-red-600">
            {{ `${t('missingConfiguration')} ${error}` }}
          </p>
        </div>
        <h3>{{ t('summary') }}</h3>
        <div
          v-for="[bundleItemId, bundleOptions] in Object.entries(product.bundle)"
          :key="bundleItemId"
          class="mt-1 text-md font-bold"
        >
          {{ product.bundleItems.find((item: any) => item.id == bundleItemId).title }}
          <ul class="list-disc">
            <li
              v-for="[bundleOptionId, bundleOption] in Object.entries(bundleOptions)"
              :key="bundleOptionId"
              class="text-sm font-normal"
            >
              {{ bundleOption.label }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import SfxMoney from '#ioc/components/SfxMoney'
import SfxImage from '#ioc/components/SfxImage'
import Heading from '#ioc/atoms/Heading'
import ProductQuantityConfigurator from '#ioc/molecules/ProductQuantityConfigurator'
import AddToCart from '#ioc/molecules/AddToCart'
import ProductGallery from '#ioc/molecules/ProductGallery'
import StockIndicator from '#ioc/atoms/StockIndicator'
import FacebookShare from '#ioc/atoms/FacebookShare'
import AddToWishlist from '#ioc/molecules/AddToWishlist'
import ProductBundlePrice from '#ioc/molecules/ProductBundlePrice'
import injectProduct from '#ioc/composables/injectProduct'
import { computed, defineAsyncComponent, ref } from 'vue'
import ReviewStars from '#ioc/atoms/ReviewStars'
import GiftPanel from '#ioc/atoms/GiftPanel'
import ProductLabel from '#ioc/atoms/ProductLabel'
import AddToComparison from '#ioc/molecules/AddToComparison'
import Button from '#ioc/atoms/Button'

const ProductBundleOptions = defineAsyncComponent(() => import('#ioc/molecules/ProductBundleOptions'))
const ProductConfigurableOptions = defineAsyncComponent(() => import('#ioc/molecules/ProductConfigurableOptions'))
const ProductOptions = defineAsyncComponent(() => import('#ioc/molecules/ProductOptions'))
const GroupedItems = defineAsyncComponent(() => import('#ioc/molecules/GroupedItems'))

const { t } = useI18n()
const product = injectProduct()

const quantity = ref(1)
const isConfigurationOpen = ref(false)

const discounted = computed(() => {
  return {
    'text-gray-900': !product.isOnSale,
    'text-primary-600': product.isOnSale,
  }
})

const onQuantityChange = (q: number) => {
  quantity.value = q
}

const openAndScrollToBundleConfiguration = () => {
  isConfigurationOpen.value = true
  const bundleConfiguration = document.getElementById('bundleConfiguration')
  if (bundleConfiguration) {
    bundleConfiguration.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }
}

const closeAndScrollToProductOverview = () => {
  isConfigurationOpen.value = false
  const productOverview = document.getElementById('productOverview')
  if (productOverview) {
    productOverview.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }
}
</script>

<style scoped>
.links:deep(a) {
  @apply text-primary-500 underline;
}
</style>

<i18n lang="yaml">
en-US:
  configureAndAdd: 'Configure and Add to cart'
  configure: 'Configure'
  goBackToProductDetails: 'Go back to product details'
  yourConfiguration: 'Your configuration'
  summary: 'Summary'
  missingConfiguration: 'Missing configuration: '
cs-CZ:
  'IN_STOCK': 'Skladem'
  'OUT_OF_STOCK': 'Vyprodáno'
  'Warranty: 24 months': 'Záruka: 24 měsíců'
  'Product information': 'Informace o produktu'
  'Add': 'Oblíbený'
  'Compare': 'Srovnat'
  configureAndAdd: 'Nakonfigurovat a přidat do košíku'
  configure: 'Nakonfigurovat'
  goBackToProductDetails: 'Zpět na detail produktu'
  yourConfiguration: 'Vaše konfigurace'
  summary: 'Souhrn'
  missingConfiguration: 'Chybí konfigurace: '
</i18n>
