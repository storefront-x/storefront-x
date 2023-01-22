<template>
  <div class="header-top">
    <Container>
      <div class="flex relative items-center justify-between">
        <div class="flex justify-between lg:w-full">
          <div class="hidden mr-2 lg:flex lg:items-center">
            <Link :to="localePath('/')" class="shrink-0 block min-w-[145px]">
              <span class="sr-only">Logo</span>
              <img class="h-[50px] w-auto" :src="logo" alt="Logo" />
            </Link>
          </div>

          <div class="flex-1 flex items-center lg:hidden">
            <button type="button" class="bg-white p-2 rounded-md text-gray-400" @click="toggleBurger">
              <span class="sr-only">Open menu</span>
              <OutlineMenu v-if="!isBurgerOpen" class="text-primary-500" />
              <OutlineX v-else class="text-primary-500" />
            </button>
          </div>

          <span class="relative w-full flex hidden lg:block lg:mx-24">
            <SearchBar />
          </span>
        </div>

        <Link :to="localePath('/')" class="lg:hidden">
          <span class="sr-only">Logo</span>
          <img :src="logo" alt="Logo" class="h-8 w-auto px-4" />
        </Link>

        <div class="flex items-center justify-end">
          <MicroCart />
          <MicroAccount :submenu="true" class="hidden lg:flex" />
          <MicroSearch class="lg:hidden mr-2" />
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useThemeTailwindStore from '#ioc/stores/useThemeTailwindStore'
import Container from '#ioc/atoms/Container'
import Link from '#ioc/atoms/Link'
import SearchBar from '#ioc/molecules/SearchBar'
import MicroAccount from '#ioc/molecules/MicroAccount'
import MicroSearch from '#ioc/molecules/MicroSearch'
import MicroCart from '#ioc/molecules/MicroCart'
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
<style scoped>
.header-top {
  background-image: url(https://www.drmax.cz/_i/1443285570.jpg?path=https%3A%2F%2Fbackend.drmax.cz%2Fmedia%2Fwysiwyg%2Fbackground-snowflakes.jpg);
  background-position: center bottom;
  background-size: contain;
  padding: 25px 0 18px;
  background-color: #fff;
  border-bottom: 7px solid #fff;
}
</style>
