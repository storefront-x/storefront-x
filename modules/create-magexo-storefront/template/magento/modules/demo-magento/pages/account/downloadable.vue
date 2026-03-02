<template>
  <SideAccountMenu>
    <DownloadableProducts :customer-downloadable-products="data.downloadableProducts" @refresh="refresh" />
  </SideAccountMenu>
</template>

<script setup lang="ts">
import SideAccountMenu from '#ioc/organisms/SideAccountMenu'
import useGetCustomerDownloadableProducts from '#ioc/services/useGetCustomerDownloadableProducts'
import useAsyncData from '#ioc/composables/useAsyncData'
import DownloadableProducts from '#ioc/templates/DownloadableProducts'

const getCustomerDownloadableProducts = useGetCustomerDownloadableProducts()
const { data, refresh } = await useAsyncData('downloadableProducts', () => getCustomerDownloadableProducts())
</script>

<i18n lang="yaml">
en-US:
  subtitle: Here, you can add/edit/remove your shipping and billing addresses.
cs-CZ:
  Addresses: Adresy
  subtitle: Zde můžete přidat/upravit/odebrat Vaše adresy.
</i18n>
