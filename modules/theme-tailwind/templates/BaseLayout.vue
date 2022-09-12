<template>
  <Header />
  <HamburgerMenu v-if="hamburgerStatus" @close="closeHamburger" />
  <main class="mt-[75px] md:mt-0">
    <SfxLayoutOutlet />
  </main>
  <Footer />
  <Notifications />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import useRoute from '#ioc/composables/useRoute'
import SfxLayoutOutlet from '#ioc/components/SfxLayoutOutlet'
import Header from '#ioc/organisms/Header'
import HamburgerMenu from '#ioc/organisms/HamburgerMenu'
import Notifications from '#ioc/organisms/Notifications'
import useThemeTailwindStore from '#ioc/stores/useThemeTailwindStore'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'

const Footer = hydrateWhenVisible(() => import('#ioc/organisms/Footer'))

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
