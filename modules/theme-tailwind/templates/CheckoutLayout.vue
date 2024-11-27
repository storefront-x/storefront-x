<template>
  <CheckoutHeader />
  <SfxPageOutlet />
  <Footer />
  <Notifications />
</template>

<script setup lang="ts">
import SfxPageOutlet from '#ioc/components/SfxPageOutlet'
import CheckoutHeader from '#ioc/organisms/CheckoutHeader'
import Footer from '#ioc/organisms/Footer'
import Notifications from '#ioc/organisms/Notifications'
import useAppVersionCheckAndForceReload from '#ioc/composables/useAppVersionCheckAndForceReload'

useAppVersionCheckAndForceReload()
</script>
