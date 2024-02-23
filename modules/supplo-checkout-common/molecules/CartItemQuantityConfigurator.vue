<template>
  <div :class="wrapperClasses">
    <Button
      :disabled="isLoadingRemove || isLoadingAdd || cartItem.product.isGiftItem"
      :class="buttonClasses"
      type="button"
      data-cy="cart-item-quantity-dec"
      @click="onDec"
    >
      <MinusIcon :class="iconStyles" />
    </Button>

    <div v-if="isLoadingAdd || isLoadingRemove" class="flex items-center">
      <Spinner data-cy="cart-item-quantity-loading" :class="spinnerStyles" />
    </div>
    <Input
      v-else
      :value="tmpQuantity"
      type="number"
      :inputmode="'decimal'"
      pattern="[0-9]*"
      :disabled="isLoadingRemove || isLoadingAdd || cartItem.product.isGiftItem"
      :class="{
        'cursor-no-drop opacity-50': cartItem.product.isGiftItem,
        [inputClasses]: true,
      }"
      data-cy="cart-item-quantity-input"
      aria-label="Quantity"
      @input="onInputDelay"
      @blur="onInput"
      @keydown.enter="onInput"
    />

    <Button
      :disabled="isLoadingAdd || cartItem.product.isGiftItem"
      :class="buttonClasses"
      type="button"
      data-cy="cart-item-quantity-inc"
      @click="onInc"
    >
      <PlusIcon :class="iconStyles" />
    </Button>
  </div>

  <ConfirmRemovalModal
    v-if="isRemoveModalOpen"
    :product="cartItem.product"
    :quantity="cartItem.quantity"
    @close="keepItem"
    @keep-product="keepItem"
    @remove-product="removeItem"
  />
</template>

<script setup lang="ts">
import debounce from '#ioc/utils/debounce'
import Button from '#ioc/atoms/Button'
import Input from '#ioc/atoms/Input'
import Spinner from '#ioc/atoms/Spinner'
import { defineAsyncComponent, ref, watch, watchEffect } from 'vue'
import injectCartItem from '#ioc/composables/injectCartItem'
import MinusIcon from '#ioc/icons/solid/MinusIcon'
import PlusIcon from '#ioc/icons/solid/PlusIcon'
import useCartStore from '#ioc/stores/useCartStore'
const ConfirmRemovalModal = defineAsyncComponent(() => import('#ioc/organisms/ConfirmRemovalModal'))

const emit = defineEmits(['keep-product'])

defineProps({
  inputClasses: {
    type: String,
    default: 'w-16 text-center',
  },
  buttonClasses: {
    type: String,
    default: '',
  },
  wrapperClasses: {
    type: String,
    default: 'flex relative gap-2',
  },
  spinnerStyles: {
    type: String,
    default: '!text-primary-500 !w-16',
  },
  iconStyles: {
    type: String,
    default: '!w-5 !h-5 text-grey-780',
  },
})
const cartItem = injectCartItem()
const cartStore = useCartStore()

const tmpQuantity = ref(cartItem.quantity)
const isRemoveModalOpen = defineModel({ default: false, type: Boolean })
const isLoadingAdd = ref(false)
const isLoadingRemove = ref(false)

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
  }, 500),
)

watchEffect(() => {
  tmpQuantity.value = cartItem.quantity
})

const onInput = (e: any) => {
  if (e.target.quantity === '') {
    return
  } else {
    tmpQuantity.value = Number(e.target.value)
  }
}

const onInputDelay = debounce((e: any) => {
  if (e.target.quantity === '') {
    return
  } else {
    tmpQuantity.value = Number(e.target.value)
  }
}, 5000)

const onInc = () => {
  tmpQuantity.value++
}

const onDec = async () => {
  if (tmpQuantity.value === 1) {
    promptRemoval()
  } else if (tmpQuantity.value > 0) {
    tmpQuantity.value--
  }
}

const promptRemoval = () => {
  isRemoveModalOpen.value = true
}

const removeItem = async () => {
  isRemoveModalOpen.value = false

  try {
    isLoadingRemove.value = true

    await cartStore.removeFromCart(cartItem)
  } finally {
    isLoadingRemove.value = false
  }
}

const keepItem = () => {
  isRemoveModalOpen.value = false
  tmpQuantity.value = cartItem.quantity
  emit('keep-product')
}

const updateQuantity = async (quantity: number) => {
  if (quantity === cartItem.quantity) return

  isLoadingAdd.value = true

  try {
    await cartStore.updateCartItem(cartItem, { quantity })
  } catch (e) {
    tmpQuantity.value = cartItem.quantity

    throw e
  } finally {
    isLoadingAdd.value = false
  }
}
</script>

<i18n lang="yaml">
en-US:
  'IN_STOCK': 'In stock'
  'price-per-piece': '{0} / pkt'
cs-CZ:
  '{0} pcs in stock': 'Skladem {0} ks'
  '> {0} pcs in stock': 'Skladem > {0} ks'
  'IN_STOCK': 'Skladem'
  'OUT_OF_STOCK': 'Vyprodáno'
  'kos': 'ks'
  'brez DDV': 'bez DPH'
  piece: kus
  'price-per-piece': '{0} / balení'
sl-SI:
  piece: kos
  'price-per-piece': '{0} / pkt'
hr-HR:
  piece: kos.
  'price-per-piece': '{0} / pkt'
sk-SK:
  '{0} pcs in stock': 'Skladom {0} ks'
  '> {0} pcs in stock': 'Skladom > {0} ks'
  'IN_STOCK': 'Skladom'
  'OUT_OF_STOCK': 'Vypredané'
  'kos': 'ks'
  'brez DDV': 'bez DPH'
  piece: kus
  'price-per-piece': '{0} / balenie'
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
