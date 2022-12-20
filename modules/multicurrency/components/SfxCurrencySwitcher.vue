<template>
  <slot v-bind="{ currencies, currentCurrency, loadingCurrency, setCurrency }" />
</template>

<script setup lang="ts">
import useMulticurrencyStore from '#ioc/stores/useMulticurrencyStore'
import useStoreStore from '#ioc/stores/useStoreStore'
import useSetCurrency from '#ioc/services/useSetCurrency'
import { computed, ref } from 'vue'

const storeStore = useStoreStore()
const multicurrencyStore = useMulticurrencyStore()
const _setCurrency = useSetCurrency()
const loadingCurrency = ref(false)

const setCurrency = async (...args: Parameters<typeof _setCurrency>) => {
  loadingCurrency.value = true

  await _setCurrency(...args)
}

const currencies = computed(() => multicurrencyStore.currencies)

const currentCurrency = computed(() => storeStore.currency)
</script>
