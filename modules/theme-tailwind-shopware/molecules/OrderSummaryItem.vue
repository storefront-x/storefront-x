<template>
  <li class="flex py-6 px-4 sm:px-6">
    <div class="flex-shrink-0">
      <img :src="cartItem.product.thumbnailUrl" :alt="cartItem.product.name" class="w-20 rounded-md" />
    </div>

    <div class="ml-6 flex-1 flex flex-col">
      <div class="flex">
        <div class="min-w-0 flex-1">
          <RouterLink :to="cartItem.product.urlPath" class="font-medium text-gray-700 hover:text-gray-800">
            {{ cartItem.product.name }}
          </RouterLink>
        </div>

        <div class="ml-4 flex-shrink-0 flow-root">
          <button
            type="button"
            class="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
            @click="onRemove"
          >
            <span class="sr-only">{{ t('Remove') }}</span>
            <SolidTrash />
          </button>
        </div>
      </div>

      <div class="flex-1 pt-2 flex flex-col md:flex-row items-end justify-between">
        <div>
          <SfxMoney v-slot="{ html }" :money="cartItem.rowTotal">
            <span class="text-gray-900 mr-2" v-html="html" />
          </SfxMoney>

          <SfxMoney v-slot="{ html }" :money="cartItem.price">
            <span class="text-gray-700 text-sm" v-html="t('qty', [html])" />
          </SfxMoney>
        </div>

        <div class="ml-4">
          <label for="quantity" class="sr-only">{{ t('Quantity') }}</label>

          <div v-if="cartItem.stackable" class="flex gap-2">
            <Button @click="onDec">-</Button>
            <Input :value="tmpQuantity" :inputmode="'decimal'" class="w-16 text-center" @input="onInput" />
            <Button @click="onInc">+</Button>
          </div>
        </div>
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
import useI18n from '#ioc/composables/useI18n'
import useUpdateCartItem from '#ioc/services/useUpdateCartItem'
import debounce from '#ioc/utils/debounce'
import { ref, watch } from 'vue'

const { t } = useI18n()
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
  'qty': '{0} / pc'
</i18n>
