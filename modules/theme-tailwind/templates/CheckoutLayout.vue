<template>
  <CheckoutHeader />
  <SfxRouterOutlet />
  <Footer />
  <Notifications />
</template>

<script setup lang="ts">
import SfxRouterOutlet from '#ioc/components/SfxRouterOutlet'
import CheckoutHeader from '#ioc/organisms/CheckoutHeader'
import Footer from '#ioc/organisms/Footer'
import Notifications from '#ioc/organisms/Notifications'
import '#ioc/assets/style'
import '#ioc/assets/typography'
</script>
