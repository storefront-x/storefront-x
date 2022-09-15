<template>
  <div>
    <ProductReviewForm v-if="isProductReviewFormVisible" @close="isProductReviewFormVisible = false" />

    <div
      v-if="!isProductReviewFormVisible && product.reviews.length"
      class="mt-6 mb-7 pb-10 border-t border-b border-gray-200 divide-y divide-gray-200 space-y-10"
    >
      <ProductReview v-for="(review, i) in product.reviews" :key="i" :product-review="review" />
    </div>

    <Button
      v-if="!isProductReviewFormVisible"
      class="mt-4"
      data-cy="add-review-button"
      @click="isProductReviewFormVisible = true"
    >
      {{ t('Add a new review') }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import Button from '#ioc/atoms/Button'
import ProductReview from '#ioc/molecules/ProductReview'
import injectProduct from '#ioc/composables/injectProduct'
import { defineAsyncComponent, ref } from 'vue'

const ProductReviewForm = defineAsyncComponent(() => import('#ioc/molecules/ProductReviewForm'))

const { t } = useI18n()
const product = injectProduct()

const isProductReviewFormVisible = ref(false)
</script>

<i18n lang="yaml">
cs-CZ:
  reviews: '{0} hodnocení'
  Customer Reviews: Zákaznické hodnocení
  Load more: Načíst další
  Add a new review: Přidat nové hodnocení
</i18n>
