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
            <RouterLink
              :to="cartItem.product.urlPath"
              class="font-medium text-gray-700 hover:text-gray-800 text-base"
              data-cy="minicart-item-title"
            >
              {{ cartItem.product.name }}
            </RouterLink>
          </h3>

          <a
            class="text-gray-400 hover:text-red-500 hover:cursor-pointer"
            data-cy="minicart-item-remove-button"
            @click="promptRemoval"
          >
            <OutlineX />
          </a>
        </div>
      </div>
      <div class="flex flex-1 items-center justify-between text-sm mt-4">
        <div class="flex gap-2">
          <Button data-cy="minicart-item-quantity-decrease-button" @click="onDec">-</Button>
          <Input
            :value="tmpQuantity"
            :inputmode="'decimal'"
            class="w-16 text-center"
            data-cy="minicart-item-quantity-input"
            @input="onInput"
          />
          <Button data-cy="minicart-item-quantity-increase-button" @click="onInc">+</Button>
        </div>

        <div class="flex">
          <SfxMoney :money="cartItem.rowTotal" el="strong" class="text-lg" data-cy="minicart-item-price" />
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
import OutlineX from '#ioc/icons/OutlineX'
import injectCartItem from '#ioc/composables/injectCartItem'
import Button from '#ioc/atoms/Button'
import Input from '#ioc/atoms/Input'
import { defineAsyncComponent, ref, watch } from 'vue'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useEmitRemoveFromCart from '#ioc/bus/emitters/useEmitRemoveFromCart'
import useCartStore from '#ioc/stores/useCartStore'

const ConfirmProductRemovalModal = defineAsyncComponent(() => import('#ioc/organisms/ConfirmProductRemovalModal'))

const cartItem = injectCartItem()
const cartStore = useCartStore()
const showErrorNotification = useShowErrorNotification()
const emitRemoveFromCart = useEmitRemoveFromCart()

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

    await cartStore.removeFromCart(cartItem)
    emitRemoveFromCart({ cartItem })
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
    await cartStore.updateCartItem(cartItem, { quantity })
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
