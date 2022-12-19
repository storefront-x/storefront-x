<template>
  <li class="flex py-4">
    <div class="h-20 w-20 flex-shrink-0 overflow-hidden">
      <img
        :src="cartItem.product.thumbnailUrl"
        :alt="cartItem.product.name"
        class="h-full w-full object-cover object-center"
      />
    </div>

    <div class="ml-4 flex flex-1 flex-col">
      <div>
        <div class="flex justify-between text-base font-medium text-gray-900 items-center">
          <h3 class="m-0 p-0 pr-4">
            <RouterLink :to="cartItem.product.urlPath" class="font-medium text-gray-700 hover:text-gray-800 text-base">
              {{ cartItem.product.name }}
            </RouterLink>
          </h3>

          <a class="text-gray-400 hover:text-red-500 hover:cursor-pointer" @click="onRemove">
            <OutlineX />
          </a>
        </div>
      </div>
      <div class="flex flex-1 items-center justify-between text-sm mt-4">
        <div class="flex gap-2">
          <Button @click="onDec">-</Button>
          <Input :value="tmpQuantity" :inputmode="'decimal'" class="w-16 text-center" @input="onInput" />
          <Button @click="onInc">+</Button>
        </div>

        <div class="flex">
          <SfxMoney :money="cartItem.rowTotal" el="strong" class="text-lg" />
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import Button from '#ioc/atoms/Button'
import Input from '#ioc/atoms/Input'
import OutlineX from '#ioc/icons/OutlineX'
import injectCartItem from '#ioc/composables/injectCartItem'
import useRemoveFromCart from '#ioc/services/useRemoveFromCart'
import useUpdateCartItem from '#ioc/services/useUpdateCartItem'
import debounce from '#ioc/utils/debounce'
import { ref, watch } from 'vue'

const cartItem = injectCartItem()
const removeFromCart = useRemoveFromCart()
const updateCartItem = useUpdateCartItem()

const tmpQuantity = ref(cartItem.quantity)

watch(
  tmpQuantity,
  debounce(async (tmpQuantity: number) => {
    await updateCartItem(cartItem, {
      quantity: tmpQuantity,
    })
  }, 250),
)

const onInput = (e: any) => {
  tmpQuantity.value = parseInt(e.target.value)
}

const onInc = () => {
  tmpQuantity.value++
}

const onDec = () => {
  if (tmpQuantity.value > 0) {
    tmpQuantity.value--
  }
}

const onRemove = async () => {
  await removeFromCart(cartItem)
}
</script>

<i18n lang="yaml">
cs-CZ:
  'IN_STOCK': 'Skladem'
  'OUT_OF_STOCK': 'Vyprodáno'
  'qty': '{0} / ks'
en-US:
  'IN_STOCK': 'In stock'
  'OUT_OF_STOCK': 'Out of stock'
  'qty': '{0} / ks'
</i18n>
