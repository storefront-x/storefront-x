<template>
  <SideAccountMenu>
    <AccountOrderDetail :customer-orders="data.customerOrders" />
  </SideAccountMenu>
</template>

<script setup lang="ts">
import SideAccountMenu from '#ioc/organisms/SideAccountMenu'
import AccountOrderDetail from '#ioc/templates/AccountOrderDetail'
import useAsyncData from '#ioc/composables/useAsyncData'
import useGetCustomerOrders from '#ioc/services/useGetCustomerOrders'

const getCustomerOrders = useGetCustomerOrders()
const { data } = await useAsyncData('customerOrders', () => getCustomerOrders())
</script>

<i18n lang="yaml">
en-US:
  subtitle: Check the status of recent orders, manage returns, and download invoices.
cs-CZ:
  Previous orders: Předchozí objednávky
  subtitle: Zde můžete zkontrolovat stav objednávky, spravovat vratky nebo stáhnout faktury.
  Recent orders: Aktuální objednávky
</i18n>
