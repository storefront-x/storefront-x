<template>
  <li class="flex flex-col py-6 pr-4 px-2 sm:px-2">
    <div class="grid grid-cols-9">
      <div class="col-span-1 flex items-center">
        <img :src="src" :alt="cartItem.product.name" class="w-20 rounded-md" />
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
  </li>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import useCartItem from '#ioc/composables/useCartItem'
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
cs-CZ:
  'IN_STOCK': 'Skladem'
  'OUT_OF_STOCK': 'Vyprodáno'
  'qty': '{0} / ks'
en-US:
  'IN_STOCK': 'In stock'
  'OUT_OF_STOCK': 'Out of stock'
  'qty': '{0} / ks'
</i18n>
