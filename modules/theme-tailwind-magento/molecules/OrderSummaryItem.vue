<template>
  <li class="flex flex-col py-6 px-4 sm:px-6">
    <div class="flex flex-row">
      <div class="flex-shrink-0">
        <img :src="src" :alt="cartItem.product.name" class="w-20 rounded-md" />
      </div>
      <div class="ml-6 flex-1 flex flex-col">
        <div class="flex">
          <div class="min-w-0 flex-1">
            <h4 class="text-sm">
              <RouterLink :to="cartItem.product.urlPath" class="font-medium text-gray-700 hover:text-gray-800">
                {{ cartItem.product.name }}
              </RouterLink>
            </h4>
            <p class="text-sm" :class="stockStatusColorClass">
              {{ t(cartItem.product.available ? 'IN_STOCK' : 'OUT_OF_STOCK') }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex-shrink-0 flow-root ml-1">
        <a class="text-gray-400 hover:text-red-500 hover:cursor-pointer" @click="promptRemoval">
          <SolidTrash />
        </a>
      </div>
    </div>

    <ConfirmProductRemovalModal
      v-if="isRemoveModalOpen"
      :name="cartItem.product.name"
      @close="keepItem"
      @keep-product="keepItem"
      @remove-product="removeItem"
    />
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
          <li v-for="value in bundleOption.values" :key="value.id" class="text-sm">{{ value.label }}</li>
        </ul>
      </div>
      <div v-for="option in cartItem.options" :key="option.id" class="mt-1 text-sm text-gray-500">
        {{ option.label }}
        <ul class="list-disc">
          <li v-for="value in option.values" :key="value.id" class="text-sm">{{ value.label }}</li>
        </ul>
      </div>
    </div>

    <div class="mt-2 flex items-center justify-between">
      <div class="flex gap-2">
        <Button @click="onDec">-</Button>
        <Input :value="tmpQuantity" :inputmode="'decimal'" class="w-16 text-center" @input="onInput" />
        <Button @click="onInc">+</Button>
      </div>

      <p class="flex flex-col mt-1 text-sm font-medium text-gray-900 flex-end text-right">
        <SfxMoney :money="cartItem.rowTotal" el="strong" class="text-lg" />

        <SfxMoney v-if="cartItem.product.isOnSale" v-slot="{ html }" :money="cartItem.product.regularPrice">
          <span class="line-through text-red-600 ml-1">{{ t('{0} / qty', [html]) }}</span>
        </SfxMoney>

        <SfxMoney v-slot="{ html }" :money="cartItem.price">
          <span class="ml-1">{{ t('{0} / qty', [html]) }}</span>
        </SfxMoney>
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import useCartItem from '#ioc/composables/useCartItem'
import useI18n from '#ioc/composables/useI18n'
import ToCartItem from '#ioc/mappers/ToCartItem'
import resizeImage from '#ioc/utils/url/resizeImage'
import debounce from '#ioc/utils/debounce'
import SolidTrash from '#ioc/icons/SolidTrash'
import Button from '#ioc/atoms/Button'
import Input from '#ioc/atoms/Input'
import { computed, defineAsyncComponent, PropType, ref, toRef, watch } from 'vue'
import useRemoveFromCart from '#ioc/services/useRemoveFromCart'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useUpdateCartItem from '#ioc/services/useUpdateCartItem'

const ConfirmProductRemovalModal = defineAsyncComponent(() => import('#ioc/organisms/ConfirmProductRemovalModal'))

const props = defineProps({
  cartItem: {
    type: Object as PropType<ReturnType<typeof ToCartItem>>,
    required: true,
  },
})

const { t } = useI18n()
const cartItem = useCartItem(toRef(props, 'cartItem'))
const removeFromCart = useRemoveFromCart()
const updateCartItem = useUpdateCartItem()
const showErrorNotification = useShowErrorNotification()

const tmpQuantity = ref(props.cartItem.quantity)
const isRemoveModalOpen = ref(false)
const isRemoveLoading = ref(false)

const src = computed(() =>
  resizeImage({
    w: 80,
    h: 80,
    path: cartItem.product.thumbnailUrl,
    fit: 'contain',
  }),
)

const stockStatusColorClass = computed(() => ({
  'text-green-600': cartItem.product.available,
  'text-red-600': !cartItem.product.available,
}))

watch(
  tmpQuantity,
  debounce(async (value: number) => {
    if (value === 0) {
      await promptRemoval()
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
en-US:
  'IN_STOCK': 'In stock'
cs-CZ:
  '{0} / qty': '{0} / ks'
  '{0} pcs in stock': 'Skladem {0} ks'
  '> {0} pcs in stock': 'Skladem > {0} ks'
  'IN_STOCK': 'Skladem'
  'OUT_OF_STOCK': 'Vyprodáno'
</i18n>
