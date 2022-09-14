<template>
  <p v-if="stockStatus" class="text-sm text-green-600 flex items-center mt-4" :class="classes">
    <InStockTile v-if="stockStatus" class="h-2 w-auto mr-1" />
    <OutOfStockTile v-if="!stockStatus" class="h-4 w-auto mr-1" />
    {{ t(stockStatus ? 'IN_STOCK' : 'OUT_OF_STOCK') }}
  </p>
</template>

<script setup lang="ts">
import InStockTile from '#ioc/icons/custom/InStockTile'
import OutOfStockTile from '#ioc/icons/custom/OutOfStockTile'
import useI18n from '#ioc/composables/useI18n'
import { computed } from 'vue'

const { t } = useI18n()

const props = defineProps({
  stockStatus: {
    default: false,
    type: Boolean,
    required: true,
  },
})

const classes = computed(() => {
  return {
    'font-bold': props.stockStatus,
    'text-red-600': !props.stockStatus,
  }
})
</script>

<i18n lang="yaml">
en-US:
  'IN_STOCK': 'In Stock'
  'OUT_OF_STOCK': 'Out of stock'
cs-CZ:
  'IN_STOCK': 'Skladem'
  'OUT_OF_STOCK': 'Vyprodáno'
</i18n>
