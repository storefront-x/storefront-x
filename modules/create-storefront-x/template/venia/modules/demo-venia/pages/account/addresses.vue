<template>
  <SideAccountMenu>
    <AccountAddresses :addresses="data.addresses" @refresh="refresh" />
  </SideAccountMenu>
</template>

<script setup lang="ts">
import SideAccountMenu from '#ioc/organisms/SideAccountMenu'
import useGetCustomerAddresses from '#ioc/services/useGetCustomerAddresses'
import useAsyncData from '#ioc/composables/useAsyncData'
import AccountAddresses from '#ioc/templates/AccountAddresses'

const getCustomerAddresses = useGetCustomerAddresses()
const { data, refresh } = await useAsyncData('customerAddresses', () => getCustomerAddresses())
</script>

<i18n lang="yaml">
en-US:
  subtitle: Here, you can add/edit/remove your shipping and billing addresses.
cs-CZ:
  Addresses: Adresy
  subtitle: Zde můžete přidat/upravit/odebrat Vaše adresy.
</i18n>
