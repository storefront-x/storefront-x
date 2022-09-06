<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <section class="bg-gray-50 rounded-lg">
    <div class="mx-auto md:grid md:grid-cols-2">
      <div
        v-for="(review, index) in reviews"
        :key="index"
        class="relative flex flex-col"
        :class="evenOddClasses(index + 1)"
      >
        <div class="md:flex-shrink-0">
          <img class="h-12" :src="review.logo" alt="Tuple" loading="lazy" />
        </div>
        <blockquote class="mt-6 md:flex-grow md:flex md:flex-col">
          <div class="relative text-lg font-medium md:flex-grow">
            <SolidQuotesIcon
              view-box="0 0 32 32"
              class="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 !h-8 !w-8 text-gray-200"
            />
            <p class="relative mb-6">
              {{ review.description }}
            </p>
          </div>
          <footer class="mt-auto">
            <div class="flex items-start">
              <div class="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                <img loading="lazy" class="h-12 w-12 rounded-full" :src="review.authorImage" alt="" />
              </div>
              <div class="ml-4">
                <div class="text-base font-medium">{{ review.authorName }}</div>
                <div class="text-base font-medium">{{ review.authorRole }}</div>
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SolidQuotesIcon from '#ioc/icons/SolidQuotesIcon'
import { defineProps } from 'vue'

defineProps({
  reviews: {
    required: true,
    type: Array,
  },
})

const evenOddClasses = (index: number) => {
  return {
    'py-14 px-6 md:p-14': true,
    'border-t-2': true,
    'border-white': true,
    'md:border-l': index % 2 === 0,
    'md:border-r': index % 2 !== 0,
  }
}
</script>
