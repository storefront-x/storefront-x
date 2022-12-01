<template>
  <Link
    :to="localePath(product.urlPath)"
    class="group cursor-pointer flex p-2 text-gray-800 hover:bg-gray-50 no-underline"
  >
    <div class="w-2/12 p-2">
      <SfxImage :src="product.thumbnailUrl" :width="50" :height="50" />
    </div>
    <div class="w-10/12 flex flex-col">
      <span class="group-hover:text-primary-600 group-hover:underline">
        {{ product.name }}
      </span>

      <SfxMoney :money="product.finalPrice" class="text-sm text-gray-600" />
    </div>
  </Link>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import SfxImage from '#ioc/components/SfxImage'
import Link from '#ioc/atoms/Link'
import injectProduct from '#ioc/composables/injectProduct'
import useLocalePath from '#ioc/composables/useLocalePath'

const product = injectProduct()
const localePath = useLocalePath()
</script>
