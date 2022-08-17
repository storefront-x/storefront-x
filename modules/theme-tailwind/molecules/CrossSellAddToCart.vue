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

<script>
import Button from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'
import useAddToCart from '#ioc/services/useAddToCart'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Button,
  },

  inject: ['$Cart', '$Product'],

  setup() {
    const addToCart = useAddToCart()
    const { t } = useI18n()

    return {
      addToCart,
      t,
    }
  },

  data: () => ({
    isLoading: false,
    isProductAdded: false,
  }),

  computed: {
    text() {
      if (this.isLoading) return this.t('Adding...')
      if (this.isProductAdded) return this.t('Added')
      return this.t('Add to cart')
    },
  },

  methods: {
    async onAddToCart() {
      await this.addToCart(this.$Product, { quantity: 1 })
      this.isProductAdded = true
    },
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Add to cart: Přidat do košíku
  Adding...: Přidávám...
  Added: Přidáno
</i18n>
