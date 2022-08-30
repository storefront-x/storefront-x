<template>
  <div v-bind="$attrs">
    <slot v-bind="{ currencies, currentCurrency, setCurrency }" />
  </div>
</template>

<script setup lang="ts">
import useMulticurrencyStore from '#ioc/stores/useMulticurrencyStore'
import useSetCurrency from '#ioc/services/useSetCurrency'
import { computed } from 'vue'
import useStoreStore from '#ioc/stores/useStoreStore'

const storeStore = useStoreStore()
const multicurrencyStore = useMulticurrencyStore()
const setCurrency = useSetCurrency()

const currencies = computed(() => multicurrencyStore.currencies[0].availableCurrencyCodes)

const currentCurrency = computed(() =>
  storeStore.selectedCurrencyCode ? storeStore.selectedCurrencyCode : storeStore.storeConfig.baseCurrencyCode,
)
</script>
