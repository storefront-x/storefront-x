<template>
  <slot v-bind="{ currencies, currentCurrency, setCurrency }" />
</template>

<script setup lang="ts">
import useMulticurrencyMagentoStore from '#ioc/stores/useMulticurrencyMagentoStore'
import useMagentoStore from '#ioc/stores/useMagentoStore'
import useSetCurrency from '#ioc/services/useSetCurrency'
import { computed } from 'vue'

const magentoStore = useMagentoStore()
const multicurrencyMagentoStore = useMulticurrencyMagentoStore()
const setCurrency = useSetCurrency()

const currencies = computed(() => multicurrencyMagentoStore.currencies.availableCurrencyCodes)

const currentCurrency = computed(() => {
  if (multicurrencyMagentoStore.selectedCurrencyCode.code) {
    return multicurrencyMagentoStore.selectedCurrencyCode
  }

  return magentoStore.storeConfig.baseCurrencyCode
})
</script>
