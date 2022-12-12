<template>
  <slot v-bind="{ currencies, currentCurrency, loadingCurrency, changeCurrency }" />
</template>

<script setup lang="ts">
import useMulticurrencyStore from '#ioc/stores/useMulticurrencyStore'
import useStoreStore from '#ioc/stores/useStoreStore'
import useSetCurrency from '#ioc/services/useSetCurrency'
import { computed, ref } from 'vue'

const storeStore = useStoreStore()
const multicurrencyStore = useMulticurrencyStore()
const setCurrency = useSetCurrency()
const loadingCurrency = ref(false)

const changeCurrency = async (...args: Parameters<typeof setCurrency>) => {
  loadingCurrency.value = true

  await setCurrency(...args)
}

const currencies = computed(() => multicurrencyStore.currencies)

const currentCurrency = computed(() => storeStore.currency)
</script>
