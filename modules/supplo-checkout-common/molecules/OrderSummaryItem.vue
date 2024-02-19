<template>
  <li class="list-none">
    <div class="flex flex-col py-6 px-4 sm:px-6">
      <div class="flex flex-row">
        <div class="flex-shrink-0">
          <img :src="src" :alt="cartItem.product.name" class="w-20 rounded-md" />
        </div>
        <div class="ml-6 flex-1 flex flex-col">
          <div class="flex">
            <div class="min-w-0 flex-1">
              <h4 class="text-sm">
                <Link
                  :to="cartItem.product.urlPath"
                  class="font-medium text-gray-700 hover:text-gray-800"
                  color="black"
                  data-cy="order-summary-item-name"
                >
                  {{ cartItem.product.name }}
                </Link>
              </h4>
            </div>
          </div>
        </div>
        <div class="flex-shrink-0 flow-root ml-1">
          <a
            v-if="!cartItem.product.isGiftItem"
            class="text-gray-400 hover:text-red-500 hover:cursor-pointer"
            data-cy="remove-order-summary-item"
            @click="isRemoveModalOpen = true"
          >
            <OutlineXIcon class="h-5 w-5" />
          </a>
        </div>
      </div>

      <div class="mx-5 flex flex-col items-left">
        <div
          v-for="({ optionLabel, valueLabel }, i) in cartItem.configurableOptions"
          :key="i"
          class="mt-1 text-sm text-gray-500"
        >
          {{ optionLabel }}: {{ valueLabel }}
        </div>
        <div v-for="bundleOption in cartItem.bundleOptions" :key="bundleOption.id" class="mt-1 text-sm text-gray-500">
          {{ bundleOption.label }}
          <ul class="list-disc">
            <li v-for="value in bundleOption.values" :key="value.id">{{ value.label }}</li>
          </ul>
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between">
        <CartItemProvider :cart-item="cartItem">
          <CartItemQuantityConfigurator
            v-model="isRemoveModalOpen"
            button-classes="text-primary-500 font-bold h-7 w-7 !text-2xl !rounded-small !p-0 border-grey-710"
            input-classes="w-10 h-7 text-center !shadow-none border-grey-710 !rounded-small !p-0"
            spinner-styles="!text-primary-500 !w-10"
            wrapper-classes="flex relative gap-2 justify-center"
            icon-styles="!w-3 !h-3 text-primary-500"
          />
        </CartItemProvider>
        <div>
          <p class="mt-1 mb-0 text-sm font-medium text-gray-900 flex-end text-right">
            <SfxMoney :money="cartItem.rowTotal" el="strong" class="text-lg" />
            <span class="block"></span>
            <br v-if="cartItem.product.isOnSale" />
            <span v-if="cartItem.product.isOnSale" class="text-left mr-1">
              <SfxMoney
                :money="cartItem.product.regularPrice"
                class="line-through text-black"
                data-cy="product-price"
              />
            </span>
            <SfxMoney v-slot="{ html }" :money="cartItem.price">
              <span :class="{ 'text-primary-500 font-bold': cartItem.product.isOnSale }">{{
                t('price-per-piece', [html])
              }}</span>
            </SfxMoney>
            <span class="text-[10px] text-gray-900 m-0 -mt-1.5 block font-light text-right">({{ t('brez DDV') }})</span>
          </p>
          <div v-if="cartItem.product.sapVolum" class="leading-none text-right">
            <SfxMoney :money="pricePerPieceCart" class="text-sm text-neutral-700" />
            <span class="text-sm text-neutral-700"> / {{ t('piece') }}</span>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import useCartItem from '#ioc/composables/useCartItem'
import useI18n from '#ioc/composables/useI18n'
import ToCartItem from '#ioc/mappers/ToCartItem'
import resizeImage from '#ioc/utils/url/resizeImage'
import { computed, PropType, ref, toRef } from 'vue'
import Link from '#ioc/atoms/Link'
import CartItemProvider from '#ioc/providers/CartItemProvider'
import CartItemQuantityConfigurator from '#ioc/molecules/CartItemQuantityConfigurator'
import OutlineXIcon from '#ioc/icons/OutlineXIcon'

const props = defineProps({
  cartItem: {
    type: Object as PropType<ReturnType<typeof ToCartItem>>,
    required: true,
  },
})

const { t } = useI18n()
const cartItem = useCartItem(toRef(props, 'cartItem'))
const isRemoveModalOpen = ref(false)

const src = computed(() =>
  resizeImage({
    w: 80,
    h: 80,
    path: cartItem.product.thumbnailUrl,
    fit: 'contain',
  }),
)

const pricePerPieceCart = computed(() => {
  return {
    value: cartItem.price.value / Number(cartItem.product.sapUmrezBal),
    currency: cartItem.price.currency,
  }
})
</script>

<i18n lang="yaml">
cs-CZ:
  '{0} pcs in stock': 'Skladem {0} ks'
  '> {0} pcs in stock': 'Skladem > {0} ks'
  'IN_STOCK': 'Skladem'
  'OUT_OF_STOCK': 'Vyprodáno'
  'kos': 'ks'
  'brez DDV': 'bez DPH'
  piece: kus
  'price-per-piece': '{0} / balení'
sk-SK:
  '{0} pcs in stock': 'Skladom {0} ks'
  '> {0} pcs in stock': 'Skladom > {0} ks'
  'IN_STOCK': 'Skladom'
  'OUT_OF_STOCK': 'Vypredané'
  'kos': 'ks'
  'brez DDV': 'bez DPH'
  piece: kus
  'price-per-piece': '{0} / balenie'
sl-SI:
  piece: kos
  'price-per-piece': '{0} / pkt'
hr-HR:
  piece: kos.
  'price-per-piece': '{0} / pkt'
</i18n>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
