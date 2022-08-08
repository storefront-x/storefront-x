<template>
  <Drawer ref="drawer" class="mt-[66px]" :disable-title-slot="true" @close="$emit('close')">
    <ul class="list-none">
      <li class="border-gray-50">
        <Accordion :heading-class="['px-4', 'py-4', 'justify-between']">
          <template #heading>Eshop</template>
          <template #default>
            <div class="" role="tabpanel" tabindex="0">
              <ul role="list" class="list-none">
                <li v-for="category in menu" :key="category.id" class="px-6 py-2 border-t-2 border-gray-50">
                  <Link :to="category.urlPath" class="no-underline -m-2 p-2 block text-gray-500">
                    {{ category.name }}
                  </Link>
                </li>
              </ul>
            </div>
          </template>
        </Accordion>
      </li>
      <li class="border-t-2 border-gray-50">
        <Link to="/" class="no-underline text-inherit py-4 px-4 block">
          {{ t('Blog') }}
        </Link>
      </li>
      <li class="">
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

    <div class="flex items-center justify-end px-4">
      <!-- <MicroAccount class="lg:flex" />
      <MicroWishlist class="lg:flex" /> -->
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

export default defineComponent({
  components: {
    Accordion,
    Drawer,
    // MicroAccount,
    // MicroWishlist,
    Link,
  },
  emits: { close: null },

  setup() {
    const { t } = useI18n()

    const drawer = ref<InstanceType<typeof Drawer>>()

    const runDrawerClose = () => {
      drawer.value?.close()
    }

    return {
      t,
      drawer,
      runDrawerClose,
    }
  },

  data() {
    return {
      CONTACT_EMAIL,
    }
  },

  computed: {
    ...mapState(useCatalogStore, ['menu']),
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
