<template>
  <ul role="list" class="text-sm font-medium text-gray-900 divide-y divide-gray-200">
    <li class="flex items-start py-6">
      <RouterLink :to="product.urlPath" class="flex-shrink w-28">
        <SfxImage
          :src="product.thumbnailUrl"
          :width="80"
          :height="80"
          :alt="product.name"
          fit="contain"
          fixed
          class="w-20 h-20 rounded-md object-center object-cover"
        />
      </RouterLink>

      <div class="flex-1 space-y-3">
        <RouterLink :to="product.urlPath" class="h3 font-bold hover:text-primary-600"> {{ product.name }} </RouterLink>
        <div class="md:flex justify-between">
          <SfxMoney :money="product.finalPrice" class="text-xl text-gray-500 md:flex-grow self-center" />

          <CrossSellAddToCart class="md:max-h-6 md:flex-shrink mt-2 md:mt-0 text-base self-end font-medium" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import SfxImage from '#ioc/components/SfxImage'
import injectProduct from '#ioc/composables/injectProduct'
import CrossSellAddToCart from '#ioc/molecules/CrossSellAddToCart'

const product = injectProduct()
</script>
