<template>
  <div class="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
    <div
      class="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start"
    >
      <ReviewStars :rating="review.averageRating" class="mt-2" />

      <div class="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
        <h3 class="text-sm font-medium text-gray-900">{{ review.summary }}</h3>

        <div class="mt-3 space-y-6 text-sm text-gray-500">
          {{ review.text }}
        </div>
      </div>
    </div>

    <div
      class="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3"
    >
      <p class="font-medium text-gray-900">{{ review.nickname }}</p>
      <time
        :datetime="d(review.createdAt)"
        class="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
      >
        {{ d(review.createdAt) }}
      </time>
    </div>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import useProductReview from '#ioc/composables/useProductReview'
import ReviewStars from '#ioc/atoms/ReviewStars'

const { d } = useI18n()

const props = defineProps({
  productReview: {
    type: Object,
    required: true,
  },
})

const review = useProductReview(props.productReview)
</script>
