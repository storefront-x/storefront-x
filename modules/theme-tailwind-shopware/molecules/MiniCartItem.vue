<template>
  <li class="flex flex-col py-6 pr-4 px-2 sm:px-2">
    <div class="grid grid-cols-9">
      <div class="col-span-1 flex items-center">
        <img :src="cartItem.product.thumbnailUrl" :alt="cartItem.product.name" class="w-20 rounded-md" />
      </div>
      <div class="col-span-2 mx-2 flex flex-col">
        <div class="flex">
          <div class="min-w-0 flex-1">
            <h4 class="text-sm">
              <RouterLink :to="cartItem.product.urlPath" class="font-medium text-gray-700 hover:text-gray-800">
                {{ cartItem.product.name }}
              </RouterLink>
            </h4>
          </div>
        </div>
      </div>
      <div class="col-span-2 mt-2 flex items-center justify-between">
        <p class="flex flex-col mt-1 text-sm font-medium text-gray-900 flex-end text-right">
          <SfxMoney :money="cartItem.rowTotal" el="strong" class="text-lg" />
        </p>
      </div>
      <div class="col-span-3 mt-2 flex items-center justify-between">
        <div class="flex gap-2">
          <Button @click="onDec">-</Button>
          <Input :value="tmpQuantity" :inputmode="'decimal'" class="w-16 text-center" @input="onInput" />
          <Button @click="onInc">+</Button>
        </div>
      </div>

      <div class="col-span-1 flex items-center justify-center">
        <a class="text-gray-400 hover:text-red-500 hover:cursor-pointer" @click="onRemove">
          <SolidTrash />
        </a>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import Button from '#ioc/atoms/Button'
import Input from '#ioc/atoms/Input'
import SolidTrash from '#ioc/icons/SolidTrash'
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
