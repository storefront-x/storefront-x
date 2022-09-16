<template>
  <Header />
  <HamburgerMenu v-if="hamburgerStatus" @close="closeHamburger" />
  <main class="mt-[66px] md:mt-0">
    <SfxLayoutOutlet />
  </main>
  <Footer />
  <Notifications />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import useRoute from '#ioc/composables/useRoute'
import SfxLayoutOutlet from '#ioc/components/SfxLayoutOutlet'
import useThemeTailwindStore from '#ioc/stores/useThemeTailwindStore'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import hydrateWhenIdle from '#ioc/utils/hydration/hydrateWhenIdle'
import useHead from '#ioc/composables/useHead'

const HamburgerMenu = defineAsyncComponent(() => import('#ioc/organisms/HamburgerMenu'))
const Header = hydrateWhenIdle(() => import('#ioc/organisms/Header'))
const Footer = hydrateWhenVisible(() => import('#ioc/organisms/Footer'))
const Notifications = hydrateWhenIdle(() => import('#ioc/organisms/Notifications'))

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

useHead({
  title: 'Storefront X',
  meta: [{ hid: 'description', name: 'description', content: 'SSR + PWA e-commerce solution' }],
})
</script>
