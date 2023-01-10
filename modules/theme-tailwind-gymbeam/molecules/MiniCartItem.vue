<template>
  <li data-cy="minicart-item" class="flex py-4">
    <div class="h-20 w-20 flex-shrink-0 overflow-hidden">
      <SfxImage
        :src="cartItem.product.thumbnailUrl"
        :width="80"
        :height="80"
        fit="contain"
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
        </div>
      </div>
      <div class="flex flex-1 items-center justify-between text-sm mt-4">
        <div class="flex gap-1 h-8 mr-4">
          <Button
            aria-label="decrement"
            class="bg-white font-bold px-2 whitespace-nowrap border-transparent shadow-transparent font-bold text-primary-500 hover:bg-gray-50 focus:ring-primary-500"
            @click="onDec"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-minus"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="4"
              stroke="#000000"
              fill="none"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </Button>
          <Input
            :value="tmpQuantity"
            :inputmode="'decimal'"
            class="w-10 text-center shadow-transparent border-2 py-0 border-primary-500 rounded-none"
            @input="onInput"
          />
          <Button
            aria-label="increment"
            class="bg-white font-bold px-2 whitespace-nowrap border-transparent shadow-transparent font-bold text-primary-500 hover:bg-gray-50 focus:ring-primary-500"
            @click="onInc"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-plus"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="4"
              stroke="#000000"
              fill="none"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </Button>
        </div>

        <div class="flex">
          <SfxMoney :money="cartItem.rowTotal" el="strong" class="text-sm text-secondary-500 font-bold" />
        </div>
      </div>
    </div>
    <ConfirmProductRemovalModal
      v-if="isRemoveModalOpen"
      :name="cartItem.product.name"
      @close="keepItem"
      @keep-product="keepItem"
      @remove-product="removeItem"
    />
  </li>
</template>

<script setup lang="ts">
import SfxImage from '#ioc/components/SfxImage'
import SfxMoney from '#ioc/components/SfxMoney'
import debounce from '#ioc/utils/debounce'
import injectCartItem from '#ioc/composables/injectCartItem'
import Button from '#ioc/atoms/Button'
import Input from '#ioc/atoms/Input'
import { defineAsyncComponent, ref, watch } from 'vue'
import useRemoveFromCart from '#ioc/services/useRemoveFromCart'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useUpdateCartItem from '#ioc/services/useUpdateCartItem'

const ConfirmProductRemovalModal = defineAsyncComponent(() => import('#ioc/organisms/ConfirmProductRemovalModal'))

const cartItem = injectCartItem()
const removeFromCart = useRemoveFromCart()
const updateCartItem = useUpdateCartItem()
const showErrorNotification = useShowErrorNotification()

const tmpQuantity = ref(cartItem.quantity)
const isRemoveModalOpen = ref(false)
const isRemoveLoading = ref(false)

watch(
  tmpQuantity,
  debounce(async (value: number) => {
    if (value === 0) {
      promptRemoval()
    } else if (value > 0) {
      await updateQuantity(value)
    } else {
      tmpQuantity.value = cartItem.quantity
    }
  }, 250),
)

const onInput = (e: any) => {
  if (e.target.quantity === '') {
    return
  } else {
    tmpQuantity.value = Number(e.target.value)
  }
}

const onInc = () => {
  tmpQuantity.value++
}

const onDec = () => {
  tmpQuantity.value--
}

const promptRemoval = () => {
  isRemoveModalOpen.value = true
}

const removeItem = async () => {
  isRemoveModalOpen.value = false

  try {
    isRemoveLoading.value = true

    await removeFromCart(cartItem)
  } catch (e) {
    showErrorNotification(e)
  } finally {
    isRemoveLoading.value = false
  }
}

const keepItem = () => {
  isRemoveModalOpen.value = false
  tmpQuantity.value = cartItem.quantity
}

const updateQuantity = async (quantity: number) => {
  if (quantity === cartItem.quantity) return

  try {
    await updateCartItem(cartItem, { quantity })
  } catch (e) {
    showErrorNotification(e)

    tmpQuantity.value = cartItem.quantity
  }
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
