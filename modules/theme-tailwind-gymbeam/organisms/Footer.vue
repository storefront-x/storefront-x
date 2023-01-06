<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <Container>
      <div class="py-10 md:py-20">
        <div class="grid md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
          <div
            class="mt-10 col-span-6 grid grid-cols-1 lg:grid-cols-2 gap-4 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6"
          >
            <div class="grid grid-cols-1 whitespace-nowrap space-y-4 md:hidden">
              <div v-for="(pageLinkCategory, index) in pageLinksByCategory" :key="index">
                <Accordion
                  :icon-class="['ml-2', 'cursor-pointer']"
                  :heading-class="[
                    'border-gray-50',
                    'justify-center',
                    'font-semibold',
                    'text-gray-500',
                    'hover:cursor-pointer',
                  ]"
                  :content-class="['text-center', 'mb-12']"
                  :open="false"
                >
                  <template #heading>
                    {{ t(pageLinkCategory.name) }}
                  </template>
                  <template #default>
                    <ul role="list" class="mt-6 pl-0 space-y-6 list-none">
                      <li v-for="(pageLink, indexChild) in pageLinkCategory.children" :key="indexChild" class="text-sm">
                        <Link :to="localePath(t(pageLink.path))" color="gray">
                          {{ t(pageLink.label) }}
                        </Link>
                      </li>
                    </ul>
                  </template>
                </Accordion>
              </div>
            </div>
            <div
              class="grid whitespace-nowrap space-y-4 sm:space-y-0 sm:col-span-3 sm:grid-cols-3 sm:gap-x-40 hidden md:grid"
            >
              <div v-for="(pageLinkCategory, index) in pageLinksByCategory" :key="index">
                <span class="border-gray-50 font-semibold text-gray-500">
                  {{ t(pageLinkCategory.name) }}
                </span>

                <ul role="list" class="mt-6 pl-0 space-y-6 list-none">
                  <li v-for="(pageLink, indexChild) in pageLinkCategory.children" :key="indexChild" class="text-sm">
                    <Link :to="localePath(t(pageLink.path))" color="gray" class="hover:underline">
                      {{ t(pageLink.label) }}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Newsletter />
        </div>
      </div>
      <div
        class="flex items-center lg:items-baseline text-gray-500 font-moderate flex-col lg:flex-row space-y-12 justify-between border-t-2 py-10 lg:py-20"
      >
        <div>
          <RouterLink :to="localePath('/')">
            <span class="sr-only">Logo</span>
            <img class="h-6 w-auto" :src="logo" alt="Logo" />
          </RouterLink>
        </div>

        <div class="text-center">Copyright &copy; 2013-2022 Magento, Inc. All rights reserved.</div>

        <BackToTop />
      </div>
    </Container>
  </footer>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Link from '#ioc/atoms/Link'
import Accordion from '#ioc/atoms/Accordion'
import BackToTop from '#ioc/molecules/BackToTop'
import Newsletter from '#ioc/molecules/Newsletter'
import useI18n from '#ioc/composables/useI18n'
import logo from '#ioc/assets/logo'
import useLocalePath from '#ioc/composables/useLocalePath'

const pageLinksByCategory = [
  {
    name: 'Useful information',
    children: [
      { label: 'Brands', path: 'brands' },
      { label: 'Blog', path: 'blog' },
      { label: 'About us', path: '/about-company' },
      { label: 'Contact', path: '/contact-us' },
    ],
  },
  {
    name: 'Customer service',
    children: [
      { label: 'Shipping and payment', path: '/shipping-and-payment' },
      { label: 'Return policy', path: '/return-policy' },
      { label: 'Terms of service', path: '/terms-of-service' },
      { label: 'Privacy policy', path: '/privacy-policy' },
      { label: 'Cookies policy', path: '/cookies-policy' },
    ],
  },
  {
    name: 'Account',
    children: [
      { label: 'Sign in', path: 'sign-in' },
      { label: 'Sign up', path: 'sign-up' },
      { label: 'Settings', path: 'account' },
      { label: 'My orders', path: 'account/orders' },
    ],
  },
]
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<i18n lang="yaml">
cs-CZ:
  Useful information: Užitečné informace
  Brands: Značky
  Blog: Blog
  About us: O nás
  Contact: Kontakt
  Customer service: Zákaznický servis
  Shipping and payment: Doprava a platba
  Return policy: Vrácení zboží
  Terms of service: Obchodní podmínky
  Privacy policy: Ochrana osobních údajů
  Cookies policy: Zásady souborů cookie
  Sign up: Registrovat
  Sign in: Přihlásit se
  Settings: Nastavení
  My orders: Moje objednávky
  Account: Účet

  /terms-of-service: /obchodni-podminky
  /about-company: /o-spolecnosti
  /return-policy: /vraceni-zbozi
  /contact-us: /kontakt
  /shipping-and-payment: /doprava-a-platba
  /privacy-policy: /ochrana-osobnich-udaju
  /cookies-policy: /zasady-souboru-cookies
</i18n>
