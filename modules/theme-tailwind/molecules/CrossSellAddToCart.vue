<template>
  <Button
    color="primary"
    :outline="isProductAdded"
    :disabled="isProductAdded"
    :loading="isLoading"
    class="max-w-xs"
    @click="onAddToCart"
  >
    <svg
      v-if="isProductAdded"
      class="h-4 w-4 mr-1 text-primary-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    {{ text }}
  </Button>
</template>

<script setup lang="ts">
import Button from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'
import injectProduct from '#ioc/composables/injectProduct'
import useCartStore from '#ioc/stores/useCartStore'
import { ref, computed } from 'vue'

const product = injectProduct()
const { t } = useI18n()
const cartStore = useCartStore()
const isLoading = ref(false)
const isProductAdded = ref(false)

const text = computed(() => {
  if (isLoading.value) return t('Adding...')
  if (isProductAdded.value) return t('Added')
  return t('Add to cart')
})

const onAddToCart = async () => {
  await cartStore.addToCart(product, { quantity: 1 })
  isProductAdded.value = true
}
</script>

<i18n lang="yaml">
cs-CZ:
  Add to cart: Přidat do košíku
  Adding...: Přidávám...
  Added: Přidáno
</i18n>
