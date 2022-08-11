<template>
  <Header />
  <HamburgerMenu v-if="hamburgerStatus" @close="closeHamburger" />
  <SfxRouterOutlet />
  <Footer />
  <Notifications />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import useRoute from '#ioc/composables/useRoute'
import SfxRouterOutlet from '#ioc/components/SfxRouterOutlet'
import Header from '#ioc/organisms/Header'
import Footer from '#ioc/organisms/Footer'
import HamburgerMenu from '#ioc/organisms/HamburgerMenu'
import Notifications from '#ioc/organisms/Notifications'
import useThemeTailwindStore from '#ioc/stores/useThemeTailwindStore'
import '#ioc/assets/style'
import '#ioc/assets/typography'

const route = useRoute()
const themeTailwindStore = useThemeTailwindStore()

const hamburgerStatus = ref(false)

const isHamburgerOpened = computed(() => themeTailwindStore.isHamburgerOpened)

watch(isHamburgerOpened, (newValue) => {
  if (newValue) {
    hamburgerStatus.value = true
  }
})

watch(route, () => {
  if (hamburgerStatus.value) {
    themeTailwindStore.isHamburgerOpened = false
  }
})

const closeHamburger = () => {
  hamburgerStatus.value = false
  if (isHamburgerOpened.value) {
    themeTailwindStore.isHamburgerOpened = false
  }
}
</script>
