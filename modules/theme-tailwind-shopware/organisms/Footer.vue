<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <Container>
      <div class="py-10 md:py-20">
        <div class="grid md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
          <div
            class="mt-10 col-span-6 grid grid-cols-1 lg:grid-cols-2 gap-4 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6"
          >
            <div
              class="grid grid-cols-1 whitespace-nowrap space-y-4 sm:space-y-0 sm:col-span-3 sm:grid-cols-3 sm:gap-x-40"
            >
              <div>
                <span class="border-gray-50 font-semibold text-gray-500 hidden sm:block">
                  {{ t('Account') }}
                </span>
                <Accordion
                  :icon-class="{ 'sm:hidden': true, 'display-block': true, 'ml-2': true, 'cursor-pointer': true }"
                  :heading-class="[
                    'border-gray-50',
                    'sm:justify-start',
                    'justify-center',
                    'sm:hidden',
                    'block',
                    'font-semibold',
                    'text-gray-500',
                  ]"
                  :content-class="['text-center', 'sm:text-left', 'mb-12', 'sm:mb-4']"
                  :open="true"
                >
                  <template #heading>
                    {{ t('Account') }}
                  </template>

                  <template #default>
                    <ul role="list" class="mt-6 pl-0 space-y-6 list-none">
                      <li class="text-sm">
                        <Link :to="t('/sign-in')" color="gray">
                          {{ t('Sign in') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('/sign-up')" color="gray">
                          {{ t('Sign up') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('/account')" color="gray">
                          {{ t('Settings') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('/account/orders')" color="gray">
                          {{ t('My orders') }}
                        </Link>
                      </li>
                    </ul>
                  </template>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center lg:items-baseline text-gray-500 font-moderate flex-col lg:flex-row space-y-12 justify-between border-t-2 py-10 lg:py-20"
      >
        <div>
          <RouterLink to="/">
            <span class="sr-only">Logo</span>
            <img class="h-6 w-auto" :src="logo" alt="Logo" loading="lazy" />
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
import useI18n from '#ioc/composables/useI18n'
import logo from '#ioc/assets/logo'

const { t } = useI18n()
</script>

<i18n lang="yaml">
cs-CZ:
  Useful information: U??ite??n?? informace
  Brands: Zna??ky
  Blog: Blog
  About us: O n??s
  Contact: Kontakt
  Customer service: Z??kaznick?? servis
  Shipping and payment: Doprava a platba
  Return policy: Vr??cen?? zbo????
  Terms of service: Obchodn?? podm??nky
  Privacy policy: Ochrana osobn??ch ??daj??
  Cookies policy: Z??sady soubor?? cookie
  Sign up: Registrovat
  Sign in: P??ihl??sit se
  Settings: Nastaven??
  My orders: Moje objedn??vky
  Account: ????et

  terms-of-service: obchodni-podminky
  about-company: o-spolecnosti
  return-policy: vraceni-zbozi
  contact-us: kontakt
  shipping-and-payment: doprava-a-platba
  privacy-policy: ochrana-osobnich-udaju
  cookies-policy: zasady-souboru-cookies
  sign-up: registrovat
  /sign-in: prihlasit
  account: account
  account/orders: ucet/objednavky
</i18n>
