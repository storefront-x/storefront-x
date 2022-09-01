<template>
  <div v-bind="$attrs">
    <slot v-bind="{ currencies, currentCurrency, setCurrency }" />
  </div>
</template>

<script setup lang="ts">
import useMulticurrencyStore from '#ioc/stores/useMulticurrencyStore'
import useStoreStore from '#ioc/stores/useStoreStore'
import useSetCurrency from '#ioc/services/useSetCurrency'
import { computed } from 'vue'

const storeStore = useStoreStore()
const multicurrencyStore = useMulticurrencyStore()
const setCurrency = useSetCurrency()

const currencies = computed(() => multicurrencyStore.currencies)

const currentCurrency = computed(() => storeStore.currency)
</script>
