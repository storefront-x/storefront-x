<template>
  <Container>
    <div class="h-16 flex realtive items-center justify-between">
      <div class="flex justify-around lg:w-4/6">
        <div class="hidden mr-2 lg:flex-1 lg:flex lg:items-center">
          <Link :to="localePath('/')">
            <span class="sr-only">Logo</span>
            <img class="h-8 w-auto" :src="logo" alt="Logo" />
          </Link>
        </div>

        <div class="flex-1 flex items-center lg:hidden">
          <button type="button" class="bg-white p-2 rounded-md text-gray-400" @click="toggleBurger">
            <span class="sr-only">Open menu</span>
            <OutlineMenu v-if="!isBurgerOpen" class="text-primary-500" />
            <OutlineX v-else class="text-primary-500" />
          </button>
        </div>

        <span class="relative w-4/6 flex hidden lg:block">
          <SearchBar />
        </span>
      </div>

      <Link :to="localePath('/')" class="lg:hidden">
        <span class="sr-only">Logo</span>
        <img :src="logo" alt="Logo" class="h-8 w-auto px-4" />
      </Link>

      <div class="flex items-center justify-end">
        <MicroComparison class="hidden lg:flex mr-2" />
        <MicroWishlist class="hidden lg:flex mr-2" />
        <MicroAccount :submenu="true" class="hidden lg:flex mr-2" />
        <MicroSearch class="lg:hidden mr-2" />
        <MicroCart />
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useThemeTailwindStore from '#ioc/stores/useThemeTailwindStore'
import Container from '#ioc/atoms/Container'
import Link from '#ioc/atoms/Link'
import SearchBar from '#ioc/molecules/SearchBar'
import MicroWishlist from '#ioc/molecules/MicroWishlist'
import MicroAccount from '#ioc/molecules/MicroAccount'
import MicroSearch from '#ioc/molecules/MicroSearch'
import MicroCart from '#ioc/molecules/MicroCart'
import MicroComparison from '#ioc/molecules/MicroComparison'
import OutlineMenu from '#ioc/icons/OutlineMenu'
import OutlineX from '#ioc/icons/OutlineX'
import logo from '#ioc/assets/logo'
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()

const themeTailwindStore = useThemeTailwindStore()

const isBurgerOpen = computed(() => themeTailwindStore.isHamburgerOpened)

const toggleBurger = () => {
  themeTailwindStore.isHamburgerOpened = !isBurgerOpen.value
}
</script>
