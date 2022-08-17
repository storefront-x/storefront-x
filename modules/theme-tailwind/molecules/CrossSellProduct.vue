<template>
  <ul role="list" class="text-sm font-medium text-gray-900 divide-y divide-gray-200">
    <li class="flex items-start py-6">
      <SfxLink :to="$Product.urlPath" class="flex-shrink w-28">
        <SfxImage
          :src="$Product.thumbnailUrl"
          :width="80"
          :height="80"
          :alt="$Product.name"
          fit="contain"
          fixed
          class="w-20 h-20 rounded-md object-center object-cover"
        />
      </SfxLink>

      <div class="flex-1 space-y-3">
        <Link :to="$Product.urlPath" class="h3 font-bold hover:text-primary-600"> {{ $Product.name }} </Link>
        <div class="md:flex justify-between">
          <SfxMoney :money="$Product.finalPrice" class="text-gray-500 md:flex-grow self-center" />
          <CrossSellAddToCart class="md:max-h-6 md:flex-shrink mt-2 md:mt-0 text-base self-end font-medium" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import SfxMoney from '#ioc/components/SfxMoney'
import SfxImage from '#ioc/components/SfxImage'
import Link from '#ioc/atoms/Link'
import CrossSellAddToCart from '#ioc/molecules/CrossSellAddToCart'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductItem',
  components: {
    CrossSellAddToCart,
    SfxMoney,
    SfxImage,
    Link,
  },

  inject: ['$Product'],
})
</script>
