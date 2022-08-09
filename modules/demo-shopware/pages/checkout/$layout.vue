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
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import { onErrorCaptured } from 'vue'

const showErrorNotification = useShowErrorNotification()

onErrorCaptured((err) => {
  showErrorNotification(err)

  return false
})
</script>
