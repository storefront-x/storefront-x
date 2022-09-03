<template>
  <Heading :level="2">{{ t('Previous orders') }}</Heading>
  <p class="mt-2 text-sm text-gray-500">
    {{ t('subtitle') }}
  </p>

  <div class="mt-16">
    <h2 class="sr-only">{{ t('Recent orders') }}</h2>

    <div class="space-y-10">
      <CustomerOrderProvider
        v-for="customerOrder in customerOrders"
        :key="customerOrder.id"
        :customer-order="customerOrder"
      >
        <CustomerOrder />
      </CustomerOrderProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import CustomerOrder from '#ioc/molecules/CustomerOrder'
import useI18n from '#ioc/composables/useI18n'
import CustomerOrderProvider from '#ioc/providers/CustomerOrderProvider'
import { PropType } from 'vue'
import ToOrder from '#ioc/mappers/ToOrder'

const { t } = useI18n()

defineProps({
  customerOrders: {
    type: Object as PropType<ReturnType<typeof ToOrder>>,
    default: () => ({}),
  },
})
</script>

<i18n lang="yaml">
en-US:
  subtitle: Check the status of recent orders, manage returns, and download invoices.
cs-CZ:
  Previous orders: Předchozí objednávky
  subtitle: Zde můžete zkontrolovat stav objednávky, spravovat vratky nebo stáhnout faktury.
  Recent orders: Aktuální objednávky
</i18n>
