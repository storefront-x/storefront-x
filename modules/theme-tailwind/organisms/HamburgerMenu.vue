<template>
  <Drawer ref="drawer" class="mt-[66px]" :disable-title-slot="true" @close="$emit('close')">
    <ul class="list-none">
      <li class="border-gray-50">
        <Accordion :heading-class="['px-4', 'py-4', 'justify-between']">
          <template #heading>Eshop</template>
          <template #default>
            <div class="" role="tabpanel" tabindex="0">
              <div v-for="category in catalogStore.menu" :key="category.id">
                <HamburgerMenuLink :category="category" />
              </div>
            </div>
          </template>
        </Accordion>
      </li>
      <li class="border-t-2 border-gray-50">
        <Link :to="localePath('blog')" class="no-underline text-inherit py-4 px-4 block">
          {{ t('Blog') }}
        </Link>
      </li>
      <li v-if="!isLoggedIn" class="border-t-2 py-4 border-gray-50 px-4">
        <div class="flow-root">
          <RouterLink :to="localePath('sign-in')" class="no-underline text-inherit -m-2 p-2 block">
            {{ t('Sign in') }}
          </RouterLink>
        </div>
      </li>
      <li>
        <Accordion :heading-class="['border-t-2', 'py-4', 'border-gray-50', 'px-4', 'justify-between']">
          <template #heading>
            {{ t('Useful information') }}
          </template>
          <template #default>
            <ul class="list-none">
              <li class="border-t-2 py-2 border-gray-50 px-4">
                <Link :to="t('contact-us')" color="gray">
                  {{ t('Contact') }}
                </Link>
              </li>
              <li class="border-t-2 py-2 border-gray-50 px-4">
                <Link :to="t('about-company')" color="gray">
                  {{ t('About us') }}
                </Link>
              </li>
              <li class="border-t-2 py-2 border-gray-50 px-4">
                <Link :to="t('shipping-and-payment')" color="gray">
                  {{ t('Shipping and payment') }}
                </Link>
              </li>
            </ul>
          </template>
        </Accordion>
      </li>
    </ul>

    <ul class="px-4 my-3 flex list-none justify-between">
      <li>
        <a
          class="no-underline text-inherit border rounded-xl text-sm font-medium border-primary-500 py-1 px-2"
          href="tel:+420725562510"
        >
          +420 725 562 510
        </a>
      </li>
      <li>
        <a
          href="mailto:CONTACT_EMAIL"
          class="no-underline text-inherit border rounded-xl text-sm font-medium border-primary-500 py-1 px-2"
        >
          {{ CONTACT_EMAIL }}
        </a>
      </li>
    </ul>

    <SfxStoreSwitcher v-slot="{ stores, currentStore, switchToStore }">
      <div class="flex items-center px-4 py-4 my-3 border-y-2 border-gray-50">
        <Dropdown data-cy="store-switcher-mobile" variant="link-like">
          <template #title>
            <div class="mr-2 self-center">
              <img :src="currentStore?.flag" class="w-5 h-5 rounded-full block" loading="lazy" />
            </div>
            {{ currentStore?.fullName }}
          </template>
          <DropdownItem v-for="store in stores" :key="store.name" @click="switchToStore(store)">
            {{ store.fullName }}
          </DropdownItem>
        </Dropdown>

        <div class="mr-2 ml-auto">
          {{ t('Language') }}
        </div>
      </div>
    </SfxStoreSwitcher>

    <SfxCurrencySwitcher v-slot="{ currentCurrency, currencies, setCurrency }">
      <div class="flex items-center px-4 pb-4 mb-3 border-b-2 border-gray-50">
        <Dropdown
          link-like
          :title="currentCurrency?.code"
          class="text-gray-600 hover:text-gray-800"
          data-cy="currency-switcher"
        >
          <DropdownItem
            v-for="currency in currencies"
            :key="currency.code"
            href="javascript:void(0)"
            @click="setCurrency(currency)"
          >
            {{ currency.code }}
          </DropdownItem>
        </Dropdown>

        <div class="mr-2 ml-auto">
          {{ t('Currency') }}
        </div>
      </div>
    </SfxCurrencySwitcher>

    <div class="flex items-center justify-end px-4">
      <MicroAccount class="lg:flex" />
      <MicroWishlist class="lg:flex" />
    </div>
  </Drawer>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { defineComponent, ref } from 'vue'
import Drawer from '#ioc/atoms/Drawer'
import MicroAccount from '#ioc/molecules/MicroAccount'
import MicroWishlist from '#ioc/molecules/MicroWishlist'
import Accordion from '#ioc/atoms/Accordion'
import Link from '#ioc/atoms/Link'
import CONTACT_EMAIL from '#ioc/config/CONTACT_EMAIL'
import useCatalogStore from '#ioc/stores/useCatalogStore'
import useThemeTailwindStore from '#ioc/stores/useThemeTailwindStore'
import useI18n from '#ioc/composables/useI18n'
import useLocalePath from '#ioc/composables/useLocalePath'
import SfxStoreSwitcher from '#ioc/components/SfxStoreSwitcher'
import Dropdown from '#ioc/atoms/Dropdown'
import DropdownItem from '#ioc/atoms/DropdownItem'
import SfxCurrencySwitcher from '#ioc/components/SfxCurrencySwitcher'
import HamburgerMenuLink from '#ioc/molecules/HeaderMenu/HamburgerMenuLink'

export default defineComponent({
  components: {
    Accordion,
    Drawer,
    MicroAccount,
    MicroWishlist,
    Link,
    SfxStoreSwitcher,
    Dropdown,
    DropdownItem,
    SfxCurrencySwitcher,
    HamburgerMenuLink,
  },

  emits: ['close'],

  setup() {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const catalogStore = useCatalogStore()

    const isLoggedIn = ref(false)

    const drawer = ref<InstanceType<typeof Drawer>>()

    const runDrawerClose = () => {
      drawer.value?.close()
    }

    return {
      t,
      drawer,
      runDrawerClose,
      isLoggedIn,
      localePath,
      catalogStore,
    }
  },

  data() {
    return {
      CONTACT_EMAIL,
    }
  },

  computed: {
    ...mapState(useThemeTailwindStore, ['isHamburgerOpened']),
  },

  watch: {
    isHamburgerOpened() {
      if (!this.isHamburgerOpened) {
        this.runDrawerClose()
      }
    },
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Brands: Značky
  Blog: Blog
  Sign in: Přihlásit se
  Useful information: Užitečné informace
  About us: O nás
  Contact: Kontakt
  Shipping and payment: Doprava a platba
  about-company: o-spolecnosti
  contact-us: kontakt
  shipping-and-payment: doprava-a-platba
  Language: Jazyk
  Currency: Měna
</i18n>
