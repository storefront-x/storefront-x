<template>
  <div class="flex" name="row1">
    <div v-if="index === 0" class="w-40" name="header"></div>
    <div name="data">
      <div>X</div>
      <div>Image</div>
      <div>Orion Two-Tone Fitted Jacket</div>
      <div>2 Reviews</div>
      <div>As low as $72.00</div>
      <div>
        <button>Add to Cart</button>
        <div>Heart</div>
      </div>
    </div>
  </div>
  <div class="flex" name="row2">
    <div v-if="index === 0" class="w-40" name="header">SKU</div>
    <div>WJ11</div>
  </div>
  <div class="flex h-100" name="row3">
    <div v-if="index === 0" class="w-40" name="description">Description</div>
    <div name="row3">
      {{ item.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import injectProduct from '#ioc/composables/injectProduct'

const { t } = useI18n()
const product = injectProduct()

defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Wishlist: Seznam přání
</i18n>
