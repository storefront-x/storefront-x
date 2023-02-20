# Multicurrency

> `@storefront-x/multicurrency`

Module enables switching between currencies. It uses `SfxCurrencySwitcher` component to switch between currencies, which are sourced from the `useMulticurrencyStore` store. Requires corresponding integration module (e.g. `@storefront-x/multicurrency-magento`).

## Requirements

For the multicurrency module to work, it needs to have few things supplied from the integration module.

- `ToCurrency` mapper
- `useSetCurrency` service
- `useSetCurrencyRepository` repository
- `serverInit` store action which sets the initial state of the `useMulticurrencyStore` store

## `SfxCurrencySwitcher` component

Higher-order component which provides its slot with a list of currencies, currently selected currency and a method for changing selected currency.

- `currencies: ReturnType<typeof ToCurrency>[]`
- `currentCurrency: ReturnType<typeof ToCurrency>`
- `setCurrency: ReturnType<typeof useSetCurrency>`

### Example

```vue
<template>
  <SfxCurrencySwitcher v-slot="{ currencies, currentCurrency, setCurrency }">
    <div v-for="currency in currencies" :key="currency.id" @click="setCurrency(currency)">
      {{ currency.code }}
      <span v-if="currency === currentCurrency">(selected)</span>
    </div>
  </SfxCurrencySwitcher>
</template>

<script setup lang="ts">
import SfxCurrencySwitcher from '#ioc/components/SfxCurrencySwitcher'
</script>
```

## `useMulticurrencyStore` store

Store, which is used as data source for the `SfxCurrencySwitcher` component.
