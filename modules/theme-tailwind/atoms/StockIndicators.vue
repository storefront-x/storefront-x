<template>
  <p v-if="stockStatus" class="text-sm flex items-center mt-4" :class="classes">
    <InStockIcon v-if="stockStatus" class="h-4 w-auto mr-3" />
    <OutOfStockIcon v-if="!stockStatus" class="h-4 w-auto mr-3" />
    {{ t(stockStatus ? 'IN_STOCK' : 'OUT_OF_STOCK') }}
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import InStockIcon from '#ioc/icons/custom/InStockIcon'
import OutOfStockIcon from '#ioc/icons/custom/OutOfStockIcon'

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
