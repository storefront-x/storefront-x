<template>
  <Link :to="product.urlPath" class="inline-block w-full">
    <li class="p-2 sm:px-4 sm:py-3 border-2 rounded-lg hover:border-primary-600 transition-all">
      <div class="flex items-center">
        <div class="w-28 flex-[0_0_7rem]">
          <SfxImage
            :src="product.thumbnailUrl"
            :width="100"
            :height="100"
            :alt="product.name"
            fit="contain"
            class-img="w-full h-full object-center object-contain sm:w-full sm:h-full pr-4 sm:pr-0"
          />
        </div>
        <div class="pl-4">
          <p>{{ product.name }}</p>
          <div>
            <SfxMoney
              :money="product.finalPrice"
              class="text-xl text-black font-bold"
              :class="discounted"
              data-cy="product-price"
            />
          </div>

          <div v-if="product.isOnSale" class="mt-1">
            <SfxMoney :money="product.regularPrice" class="line-through text-slate-400" data-cy="product-price" />
          </div>
        </div>
      </div>
    </li>
  </Link>
</template>

<script setup lang="ts">
import SfxImage from '#ioc/components/SfxImage'
import SfxMoney from '#ioc/components/SfxMoney'
import useProduct from '#ioc/composables/useProduct'
import { computed } from 'vue'
import Link from '#ioc/atoms/Link'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})

const product = useProduct(computed(() => props.item.product))

const discounted = computed(() => {
  return {
    'text-gray-900': !product.isOnSale,
    'text-primary-600': product.isOnSale,
  }
})
</script>
